use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum MediaType {
    Video,
    Audio,
    Image,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaClip {
    pub id: String,
    pub name: String,
    pub source: String,
    pub media_type: MediaType,
    pub start_time: f64,
    pub duration: f64,
    pub in_point: f64,
    pub out_point: f64,
    pub effects: Vec<String>,
    pub properties: HashMap<String, serde_json::Value>,
}

impl MediaClip {
    pub fn new(name: String, source: String, media_type: MediaType, duration: f64) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            name,
            source,
            media_type,
            start_time: 0.0,
            duration,
            in_point: 0.0,
            out_point: duration,
            effects: Vec::new(),
            properties: HashMap::new(),
        }
    }

    pub fn end_time(&self) -> f64 {
        self.start_time + self.duration
    }

    pub fn add_effect(&mut self, effect_id: String) {
        if !self.effects.contains(&effect_id) {
            self.effects.push(effect_id);
        }
    }

    pub fn remove_effect(&mut self, effect_id: &str) {
        self.effects.retain(|e| e != effect_id);
    }

    pub fn set_property(&mut self, key: String, value: serde_json::Value) {
        self.properties.insert(key, value);
    }

    pub fn get_property(&self, key: &str) -> Option<&serde_json::Value> {
        self.properties.get(key)
    }

    pub fn set_start_time(&mut self, time: f64) {
        self.start_time = time.max(0.0);
    }

    pub fn set_duration(&mut self, duration: f64) {
        self.duration = duration.max(0.0);
        self.out_point = self.in_point + duration;
    }

    pub fn trim(&mut self, in_point: f64, out_point: f64) {
        self.in_point = in_point.max(0.0);
        self.out_point = out_point.min(self.duration);
        self.duration = self.out_point - self.in_point;
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum TrackType {
    Video,
    Audio,
    Effect,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Track {
    pub id: String,
    pub name: String,
    pub track_type: TrackType,
    pub clips: Vec<MediaClip>,
    pub locked: bool,
    pub hidden: bool,
    pub muted: bool,
    pub volume: f64,
}

impl Track {
    pub fn new(name: String, track_type: TrackType) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            name,
            track_type,
            clips: Vec::new(),
            locked: false,
            hidden: false,
            muted: false,
            volume: 1.0,
        }
    }

    pub fn add_clip(&mut self, clip: MediaClip) {
        self.clips.push(clip);
    }

    pub fn remove_clip(&mut self, clip_id: &str) -> Option<MediaClip> {
        if let Some(pos) = self.clips.iter().position(|c| c.id == clip_id) {
            Some(self.clips.remove(pos))
        } else {
            None
        }
    }

    pub fn get_clip(&self, clip_id: &str) -> Option<&MediaClip> {
        self.clips.iter().find(|c| c.id == clip_id)
    }

    pub fn get_clip_mut(&mut self, clip_id: &str) -> Option<&mut MediaClip> {
        self.clips.iter_mut().find(|c| c.id == clip_id)
    }

    pub fn total_duration(&self) -> f64 {
        self.clips
            .iter()
            .map(|c| c.end_time())
            .max_by(|a, b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal))
            .unwrap_or(0.0)
    }

    pub fn lock(&mut self) {
        self.locked = true;
    }

    pub fn unlock(&mut self) {
        self.locked = false;
    }

    pub fn hide(&mut self) {
        self.hidden = true;
    }

    pub fn show(&mut self) {
        self.hidden = false;
    }

    pub fn mute(&mut self) {
        self.muted = true;
    }

    pub fn unmute(&mut self) {
        self.muted = false;
    }

    pub fn set_volume(&mut self, volume: f64) {
        self.volume = volume.clamp(0.0, 2.0);
    }
}
