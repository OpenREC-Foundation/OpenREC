pub mod microphone;
pub mod system;
pub mod mixer;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AudioConfig {
    pub enabled: bool,
    pub mic_enabled: bool,
    pub system_enabled: bool,
    pub sample_rate: u32,
    pub channels: u16,
}

pub struct AudioCapture {
    config: AudioConfig,
    mic_level: f32,
    system_level: f32,
    running: bool,
}

impl AudioCapture {
    pub fn new(config: AudioConfig) -> Result<Self, crate::RecorderError> {
        Ok(Self {
            config,
            mic_level: 0.0,
            system_level: 0.0,
            running: false,
        })
    }

    pub async fn start(&mut self) -> Result<(), crate::RecorderError> {
        if self.config.mic_enabled {
            // Start microphone capture
        }
        if self.config.system_enabled {
            // Start system audio capture
        }
        self.running = true;
        Ok(())
    }

    pub async fn stop(&mut self) -> Result<(), crate::RecorderError> {
        self.running = false;
        Ok(())
    }

    pub fn get_levels(&self) -> (f32, f32) {
        (self.mic_level, self.system_level)
    }
}
