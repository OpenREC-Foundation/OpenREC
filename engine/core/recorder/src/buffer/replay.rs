use super::circular::CircularBuffer;
use crate::RecorderError;

pub struct ReplayBuffer {
    buffer: CircularBuffer,
    recording: bool,
}

impl ReplayBuffer {
    pub fn new(max_seconds: usize, width: u32, height: u32) -> Self {
        Self {
            buffer: CircularBuffer::new(max_seconds * 60, width, height),
            recording: false,
        }
    }

    pub fn start(&mut self) {
        self.recording = true;
    }

    pub fn stop(&mut self) {
        self.recording = false;
    }

    pub fn save_last_seconds(&self, _seconds: f64) -> Result<String, RecorderError> {
        if !self.recording {
            return Err(RecorderError::NotRecording);
        }
        let path = format!("replay_{}.mp4", uuid::Uuid::new_v4());
        Ok(path)
    }
}
