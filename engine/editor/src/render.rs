use openrec_core::Timeline;
use crate::EditorError;

pub struct RenderEngine { width: u32, height: u32, frame_rate: f64 }
impl RenderEngine {
    pub fn new(width: u32, height: u32, frame_rate: f64) -> Self { Self { width, height, frame_rate } }
    pub fn render_frame(&self, _timeline: &Timeline, _time: f64) -> Result<Vec<u8>, EditorError> { Ok(vec![0u8; (self.width * self.height * 4) as usize]) }
    pub fn export(&self, _timeline: &Timeline, _output: &str) -> Result<(), EditorError> { Ok(()) }
}
