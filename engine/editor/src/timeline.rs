use openrec_core::{Timeline, Track, MediaClip, TrackType};
use crate::EditorError;

#[derive(Debug, thiserror::Error)]
pub enum TimelineError {
    #[error("Track not found: {0}")]
    TrackNotFound(String),
    #[error("Clip not found: {0}")]
    ClipNotFound(String),
    #[error("Track is locked")]
    TrackLocked,
    #[error("Invalid time: {0}")]
    InvalidTime(f64),
    #[error("Overlap detected")]
    Overlap,
}

pub struct TimelineController {
    timeline: Timeline,
}

impl TimelineController {
    pub fn new(frame_rate: f64, width: u32, height: u32) -> Self {
        Self {
            timeline: Timeline::new(frame_rate, width, height),
        }
    }

    pub fn timeline(&self) -> &Timeline {
        &self.timeline
    }

    pub fn add_track(&mut self, track: Track) -> Result<(), EditorError> {
        self.timeline.add_track(track);
        Ok(())
    }

    pub fn remove_track(&mut self, track_id: &str) -> Result<(), EditorError> {
        self.timeline.remove_track(track_id).map_err(|e| EditorError::Timeline(e.to_string().into()))?;
        Ok(())
    }

    pub fn add_clip_to_track(&mut self, track_id: &str, clip: MediaClip) -> Result<(), EditorError> {
        let track = self.timeline.get_track_mut(track_id)
            .ok_or_else(|| EditorError::Timeline(TimelineError::TrackNotFound(track_id.to_string())))?;
        if track.locked {
            return Err(EditorError::Timeline(TimelineError::TrackLocked));
        }
        track.add_clip(clip);
        self.timeline.update_duration();
        Ok(())
    }

    pub fn split_clip(&mut self, clip_id: &str, time: f64) -> Result<(), EditorError> {
        if time <= 0.0 {
            return Err(EditorError::Timeline(TimelineError::InvalidTime(time)));
        }
        let tracks = &mut self.timeline.tracks;
        for track in tracks.iter_mut() {
            if let Some(clip) = track.get_clip(&clip_id) {
                let clip_start = clip.start_time;
                let clip_dur = clip.duration;
                if time >= clip_dur {
                    return Err(EditorError::Timeline(TimelineError::InvalidTime(time)));
                }
                let new_clip = MediaClip::new(
                    clip.name.clone(),
                    clip.source.clone(),
                    clip.media_type.clone(),
                    clip_dur - time,
                );
                // Update original clip
                if let Some(orig_clip) = track.get_clip_mut(clip_id) {
                    orig_clip.duration = time;
                    orig_clip.out_point = orig_clip.in_point + time;
                }
                // Add new clip with offset start time
                let mut new_clip_mut = new_clip;
                new_clip_mut.start_time = clip_start + time;
                new_clip_mut.in_point = clip.in_point + time;
                new_clip_mut.out_point = clip.out_point;
                track.add_clip(new_clip_mut);
                self.timeline.update_duration();
                return Ok(());
            }
        }
        Err(EditorError::Timeline(TimelineError::ClipNotFound(clip_id.to_string())))
    }

    pub fn move_clip(&mut self, clip_id: &str, new_track_id: &str, new_start: f64) -> Result<(), EditorError> {
        // Remove from current track
        let mut clip = None;
        let mut source_track_id = None;
        for track in &mut self.timeline.tracks {
            if let Some(found) = track.remove_clip(clip_id) {
                clip = Some(found);
                source_track_id = Some(track.id.clone());
                break;
            }
        }
        let mut clip = clip.ok_or_else(|| EditorError::Timeline(TimelineError::ClipNotFound(clip_id.to_string())))?;
        clip.start_time = new_start;
        // Add to new track
        let new_track = self.timeline.get_track_mut(new_track_id)
            .ok_or_else(|| EditorError::Timeline(TimelineError::TrackNotFound(new_track_id.to_string())))?;
        new_track.add_clip(clip);
        self.timeline.update_duration();
        Ok(())
    }
}
