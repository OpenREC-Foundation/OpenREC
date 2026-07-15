pub mod screen;
pub mod window;
pub mod camera;
pub mod region;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CaptureConfig {
    pub resolution: CaptureResolution,
    pub frame_rate: u32,
    pub bitrate: u32,
    pub codec: String,
    pub source: CaptureSource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CaptureResolution {
    pub width: u32,
    pub height: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum CaptureSource {
    Screen,
    Window(String),
    Region { x: i32, y: i32, width: u32, height: u32 },
}

use std::sync::Arc;
use tokio::sync::Mutex;

pub struct ScreenCapture {
    config: CaptureConfig,
    inner: Arc<Mutex<Option<CaptureInner>>>,
    running: bool,
}

struct CaptureInner {
    // Platform-specific capture handle
}

impl ScreenCapture {
    pub fn new(config: CaptureConfig) -> Result<Self, super::RecorderError> {
        Ok(Self {
            config,
            inner: Arc::new(Mutex::new(None)),
            running: false,
        })
    }

    pub async fn start(&mut self) -> Result<(), super::RecorderError> {
        // Platform-specific initialization
        self.running = true;
        Ok(())
    }

    pub async fn stop(&mut self) -> Result<(), super::RecorderError> {
        self.running = false;
        Ok(())
    }

    pub fn is_running(&self) -> bool {
        self.running
    }
}

pub struct CameraCapture {
    config: CaptureConfig,
    running: bool,
}

impl CameraCapture {
    pub fn new(config: CaptureConfig) -> Result<Self, super::RecorderError> {
        Ok(Self {
            config,
            running: false,
        })
    }

    pub async fn start(&mut self) -> Result<(), super::RecorderError> {
        self.running = true;
        Ok(())
    }

    pub async fn stop(&mut self) -> Result<(), super::RecorderError> {
        self.running = false;
        Ok(())
    }
}
