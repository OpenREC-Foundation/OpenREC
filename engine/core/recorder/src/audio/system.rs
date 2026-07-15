use crate::RecorderError;

pub fn start_system_audio() -> Result<(), RecorderError> {
    // Loopback capture (PulseAudio monitor, WASAPI loopback, etc.)
    Ok(())
}

pub fn stop_system_audio() -> Result<(), RecorderError> {
    Ok(())
}

pub fn get_system_audio_level() -> f32 {
    0.0
}
