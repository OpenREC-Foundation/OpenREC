use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum MediaType { Video, Audio, Image }

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
    pub fn end_time(&self) -> f64 { self.start_time + self.duration }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum TrackType { Video, Audio, Effect }

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
        Self { id: Uuid::new_v4().to_string(), name, track_type, clips: vec![], locked: false, hidden: false, muted: false, volume: 1.0 }
    }
    pub fn add_clip(&mut self, clip: MediaClip) { self.clips.push(clip); }
    pub fn total_duration(&self) -> f64 { self.clips.iter().map(|c| c.end_time()).max_by(|a,b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal)).unwrap_or(0.0) }
}
