#[cfg(target_os = "linux")]
use x11cap::Screen;

#[cfg(target_os = "windows")]
use scrap::{Capturer, Display};

#[cfg(target_os = "macos")]
use core_graphics::display::CGDisplay;

use crate::capture::CaptureConfig;
use crate::RecorderError;

pub fn create_screen_capture(config: &CaptureConfig) -> Result<Vec<u8>, RecorderError> {
    #[cfg(target_os = "linux")]
    {
        let screen = Screen::default();
        let image = screen.capture().map_err(|e| RecorderError::Capture(e.to_string()))?;
        Ok(image.data().to_vec())
    }
    #[cfg(target_os = "windows")]
    {
        let display = Display::primary().map_err(|e| RecorderError::Capture(e.to_string()))?;
        let mut capturer = Capturer::new(display).map_err(|e| RecorderError::Capture(e.to_string()))?;
        let frame = capturer.frame().map_err(|e| RecorderError::Capture(e.to_string()))?;
        Ok(frame.to_vec())
    }
    #[cfg(target_os = "macos")]
    {
        let display = CGDisplay::main();
        let image = display.image().map_err(|e| RecorderError::Capture(e.to_string()))?;
        Ok(image.data().to_vec())
    }
    #[cfg(not(any(target_os = "linux", target_os = "windows", target_os = "macos")))]
    {
        Err(RecorderError::Capture("Unsupported platform".into()))
    }
}
