use std::collections::VecDeque;
use std::sync::Arc;
use parking_lot::RwLock;

pub struct Frame { pub data: Vec<u8>, pub timestamp: f64 }

pub struct CircularBuffer {
    frames: Arc<RwLock<VecDeque<Frame>>>,
    max_frames: usize,
}

impl CircularBuffer {
    pub fn new(max_frames: usize) -> Self { Self { frames: Arc::new(RwLock::new(VecDeque::with_capacity(max_frames))), max_frames } }
    pub fn push(&self, frame: Frame) {
        let mut frames = self.frames.write();
        if frames.len() >= self.max_frames { frames.pop_front(); }
        frames.push_back(frame);
    }
    pub fn snapshot(&self) -> Vec<Frame> { self.frames.read().iter().cloned().collect() }
}
