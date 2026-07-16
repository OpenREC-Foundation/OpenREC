use super::circular::CircularBuffer;
use crate::RecorderError;

pub struct ReplayBuffer {
    buffer: CircularBuffer,
    recording: bool,
}

impl ReplayBuffer {
    pub fn new(max_seconds: usize) -> Self { Self { buffer: CircularBuffer::new(max_seconds * 60), recording: false } }
    pub fn start(&mut self) { self.recording = true; }
    pub fn save_last_seconds(&self, _seconds: f64) -> Result<String, RecorderError> { Err(RecorderError::NotRecording) }
}
