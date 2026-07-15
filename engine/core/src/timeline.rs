use crate::media::Track;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Timeline {
    pub tracks: Vec<Track>,
    pub duration: f64,
    pub frame_rate: f64,
    pub resolution: (u32, u32),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum TimelineOperation {
    AddTrack(Track),
    RemoveTrack(String),
    MoveTrack { from: usize, to: usize },
    SplitClip { clip_id: String, time: f64 },
    TrimClip { clip_id: String, in_point: f64, out_point: f64 },
    MoveClip { clip_id: String, track_id: String, new_start: f64 },
    DeleteClip { clip_id: String, track_id: String },
    SetProperty { clip_id: String, key: String, value: serde_json::Value },
}

#[derive(Debug)]
pub enum TimelineError {
    TrackNotFound(String),
    ClipNotFound(String),
    InvalidOperation(String),
    InvalidTime(f64),
    TrackLocked(String),
}

impl std::fmt::Display for TimelineError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::TrackNotFound(id) => write!(f, "Track not found: {id}"),
            Self::ClipNotFound(id) => write!(f, "Clip not found: {id}"),
            Self::InvalidOperation(msg) => write!(f, "Invalid operation: {msg}"),
            Self::InvalidTime(time) => write!(f, "Invalid time: {time}"),
            Self::TrackLocked(id) => write!(f, "Track is locked: {id}"),
        }
    }
}

impl Timeline {
    pub fn new(frame_rate: f64, width: u32, height: u32) -> Self {
        Self {
            tracks: Vec::new(),
            duration: 0.0,
            frame_rate,
            resolution: (width, height),
        }
    }

    pub fn add_track(&mut self, track: Track) {
        self.tracks.push(track);
    }

    pub fn remove_track(&mut self, track_id: &str) -> Result<Track, TimelineError> {
        if let Some(pos) = self.tracks.iter().position(|t| t.id == track_id) {
            Ok(self.tracks.remove(pos))
        } else {
            Err(TimelineError::TrackNotFound(track_id.to_string()))
        }
    }

    pub fn get_track(&self, track_id: &str) -> Option<&Track> {
        self.tracks.iter().find(|t| t.id == track_id)
    }

    pub fn get_track_mut(&mut self, track_id: &str) -> Option<&mut Track> {
        self.tracks.iter_mut().find(|t| t.id == track_id)
    }

    pub fn move_track(&mut self, from: usize, to: usize) -> Result<(), TimelineError> {
        if from >= self.tracks.len() || to >= self.tracks.len() {
            return Err(TimelineError::InvalidOperation(
                "Track index out of bounds".to_string(),
            ));
        }
        let track = self.tracks.remove(from);
        self.tracks.insert(to, track);
        Ok(())
    }

    pub fn update_duration(&mut self) {
        self.duration = self
            .tracks
            .iter()
            .map(|t| t.total_duration())
            .max_by(|a, b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal))
            .unwrap_or(0.0);
    }

    pub fn apply_operation(&mut self, operation: TimelineOperation) -> Result<(), TimelineError> {
        match operation {
            TimelineOperation::AddTrack(track) => {
                self.add_track(track);
            }
            TimelineOperation::RemoveTrack(track_id) => {
                self.remove_track(&track_id)?;
            }
            TimelineOperation::MoveTrack { from, to } => {
                self.move_track(from, to)?;
            }
            TimelineOperation::MoveClip {
                clip_id,
                track_id,
                new_start,
            } => {
                let track = self
                    .get_track_mut(&track_id)
                    .ok_or_else(|| TimelineError::TrackNotFound(track_id.clone()))?;
                if track.locked {
                    return Err(TimelineError::TrackLocked(track_id));
                }
                if let Some(clip) = track.get_clip_mut(&clip_id) {
                    clip.set_start_time(new_start);
                } else {
                    return Err(TimelineError::ClipNotFound(clip_id));
                }
            }
            TimelineOperation::DeleteClip {
                clip_id,
                track_id,
            } => {
                let track = self
                    .get_track_mut(&track_id)
                    .ok_or_else(|| TimelineError::TrackNotFound(track_id.clone()))?;
                if track.locked {
                    return Err(TimelineError::TrackLocked(track_id));
                }
                track
                    .remove_clip(&clip_id)
                    .ok_or_else(|| TimelineError::ClipNotFound(clip_id))?;
            }
            TimelineOperation::SplitClip { clip_id, time } => {
                // Implementação simplificada - será expandida
                if time < 0.0 {
                    return Err(TimelineError::InvalidTime(time));
                }
                // Encontra o clipe e divide em dois
                for track in &mut self.tracks {
                    if let Some(clip) = track.get_clip(&clip_id) {
                        if time > 0.0 && time < clip.duration {
                            let original_duration = clip.duration;
                            let mut new_clip = clip.clone();
                            new_clip.id = uuid::Uuid::new_v4().to_string();
                            new_clip.start_time = clip.start_time + time;
                            new_clip.duration = original_duration - time;
                            new_clip.in_point = clip.in_point + time;
                            new_clip.out_point = clip.out_point;

                            let original = track.get_clip_mut(&clip_id).unwrap();
                            original.duration = time;
                            original.out_point = original.in_point + time;

                            track.add_clip(new_clip);
                            return Ok(());
                        }
                    }
                }
                return Err(TimelineError::ClipNotFound(clip_id));
            }
            TimelineOperation::TrimClip {
                clip_id,
                in_point,
                out_point,
            } => {
                for track in &mut self.tracks {
                    if let Some(clip) = track.get_clip_mut(&clip_id) {
                        clip.trim(in_point, out_point);
                        return Ok(());
                    }
                }
                return Err(TimelineError::ClipNotFound(clip_id));
            }
            TimelineOperation::SetProperty {
                clip_id,
                key,
                value,
            } => {
                for track in &mut self.tracks {
                    if let Some(clip) = track.get_clip_mut(&clip_id) {
                        clip.set_property(key, value);
                        return Ok(());
                    }
                }
                return Err(TimelineError::ClipNotFound(clip_id));
            }
        }
        self.update_duration();
        Ok(())
    }

    pub fn get_all_clips(&self) -> Vec<&crate::media::MediaClip> {
        self.tracks
            .iter()
            .flat_map(|t| t.clips.iter())
            .collect()
    }
}
