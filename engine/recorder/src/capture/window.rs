use crate::RecorderError;
pub fn capture_window(_id: &str) -> Result<Vec<u8>, RecorderError> { Err(RecorderError::Capture("Not implemented".into())) }
