use crate::RecorderError;
pub fn capture_region(_x: i32, _y: i32, _w: u32, _h: u32) -> Result<Vec<u8>, RecorderError> { Err(RecorderError::Capture("Not implemented".into())) }
