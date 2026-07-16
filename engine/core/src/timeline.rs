use crate::media::Track;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Timeline {
    pub tracks: Vec<Track>,
    pub duration: f64,
    pub frame_rate: f64,
    pub resolution: (u32, u32),
}

impl Timeline {
    pub fn new(frame_rate: f64, width: u32, height: u32) -> Self {
        Self {
            tracks: vec![],
            duration: 0.0,
            frame_rate,
            resolution: (width, height),
        }
    }
    pub fn add_track(&mut self, track: Track) {
        self.tracks.push(track);
    }
}
