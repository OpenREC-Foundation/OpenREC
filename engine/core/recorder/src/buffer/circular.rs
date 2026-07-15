use std::collections::VecDeque;
use std::sync::Arc;
use parking_lot::RwLock;

pub struct Frame {
    pub data: Vec<u8>,
    pub timestamp: f64,
    pub frame_type: FrameType,
}

pub enum FrameType {
    Video,
    Audio,
}

pub struct CircularBuffer {
    frames: Arc<RwLock<VecDeque<Frame>>>,
    max_frames: usize,
    frame_rate: f64,
    total_seconds: Arc<RwLock<f64>>,
}

impl CircularBuffer {
    pub fn new(max_frames: usize, _width: u32, _height: u32) -> Self {
        Self {
            frames: Arc::new(RwLock::new(VecDeque::with_capacity(max_frames))),
            max_frames,
            frame_rate: 60.0,
            total_seconds: Arc::new(RwLock::new(0.0)),
        }
    }

    pub fn push(&self, frame: Frame) {
        let mut frames = self.frames.write();
        if frames.len() >= self.max_frames {
            frames.pop_front();
        }
        frames.push_back(frame);
        let seconds = frames.len() as f64 / self.frame_rate;
        *self.total_seconds.write() = seconds;
    }

    pub fn snapshot(&self) -> Vec<Frame> {
        self.frames.read().iter().cloned().collect()
    }

    pub fn seconds_available(&self) -> f64 {
        *self.total_seconds.read()
    }

    pub fn clear(&self) {
        self.frames.write().clear();
        *self.total_seconds.write() = 0.0;
    }

    pub fn len(&self) -> usize {
        self.frames.read().len()
    }
}
