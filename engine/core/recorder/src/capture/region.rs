use crate::RecorderError;

pub fn capture_region(x: i32, y: i32, width: u32, height: u32) -> Result<Vec<u8>, RecorderError> {
    // Platform-specific region capture
    Err(RecorderError::Capture(format!("Region capture not implemented for ({x},{y}) {width}x{height}")))
}
