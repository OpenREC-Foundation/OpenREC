pub mod encoder;

use openrec_core::Timeline;
use serde::{Deserialize, Serialize};

#[derive(Debug, thiserror::Error)]
pub enum ExportError {
    #[error("Encoder error: {0}")]
    Encoder(String),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("Invalid config: {0}")]
    Config(String),
    #[error("Unsupported codec: {0}")]
    Codec(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportConfig {
    pub codec: String,
    pub resolution: Resolution,
    pub frame_rate: f64,
    pub bitrate: u32,
    pub quality: u8,
    pub hardware_acceleration: bool,
    pub audio_codec: String,
    pub audio_bitrate: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Resolution {
    pub width: u32,
    pub height: u32,
}

pub struct Exporter {
    config: ExportConfig,
}

impl Exporter {
    pub fn new(config: ExportConfig) -> Self {
        Self { config }
    }

    pub async fn export(
        &self,
        timeline: &Timeline,
        output_path: &str,
    ) -> Result<(), ExportError> {
        // Create parent dirs
        let path = std::path::Path::new(output_path);
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }

        // Build encoding pipeline
        let mut encoder = encoder::VideoEncoder::new(self.config.clone())?;

        let total_frames = (timeline.duration * self.config.frame_rate).ceil() as u64;

        for frame_num in 0..total_frames {
            let time = frame_num as f64 / self.config.frame_rate;
            // In real implementation: render frame from timeline, then encode
            // Here we just forward to encoder stub
        }

        encoder.finish()?;
        Ok(())
    }
}
