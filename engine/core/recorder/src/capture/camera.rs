use crate::RecorderError;
use super::CaptureConfig;

pub fn start_camera_capture(config: &CaptureConfig) -> Result<(), RecorderError> {
    // Platform-specific camera capture (nokhwa or platform native)
    Err(RecorderError::Capture("Camera capture not available".into()))
}

pub fn stop_camera_capture() -> Result<(), RecorderError> {
    Ok(())
}

pub fn capture_frame() -> Result<Vec<u8>, RecorderError> {
    Err(RecorderError::Capture("Camera frame not available".into()))
}
