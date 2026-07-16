use openrec_core::{Timeline, Track, MediaClip};
use crate::EditorError;

pub struct TimelineController { timeline: Timeline }
impl TimelineController {
    pub fn new(frame_rate: f64, width: u32, height: u32) -> Self { Self { timeline: Timeline::new(frame_rate, width, height) } }
    pub fn add_track(&mut self, track: Track) { self.timeline.add_track(track); }
    pub fn timeline(&self) -> &Timeline { &self.timeline }
}
