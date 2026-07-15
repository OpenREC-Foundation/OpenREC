use crate::RecorderError;

pub fn start_microphone() -> Result<(), RecorderError> {
    #[cfg(target_os = "linux")]
    {
        // pulseaudio capture
    }
    #[cfg(target_os = "windows")]
    {
        // wasapi capture
    }
    #[cfg(target_os = "macos")]
    {
        // coreaudio capture
    }
    Ok(())
}

pub fn stop_microphone() -> Result<(), RecorderError> {
    Ok(())
}

pub fn get_mic_level() -> f32 {
    0.0
}
