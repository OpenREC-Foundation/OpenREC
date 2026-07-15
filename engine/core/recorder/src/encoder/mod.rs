pub mod video;
pub mod audio;
pub mod hardware;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EncoderConfig {
    pub codec: String,
    pub bitrate: u32,
    pub resolution: (u32, u32),
    pub frame_rate: u32,
    pub hardware_acceleration: bool,
}

pub struct EncodedFrame {
    pub data: Vec<u8>,
    pub timestamp: f64,
    pub keyframe: bool,
}

pub struct Encoder {
    config: EncoderConfig,
    frames: Vec<EncodedFrame>,
    running: bool,
}

impl Encoder {
    pub fn new(config: EncoderConfig) -> Result<Self, crate::RecorderError> {
        Ok(Self {
            config,
            frames: Vec::new(),
            running: false,
        })
    }

    pub async fn encode_frame(&mut self, _data: &[u8], _timestamp: f64) -> Result<EncodedFrame, crate::RecorderError> {
        // Real encoding would use ffmpeg sidecar or libavcodec
        Ok(EncodedFrame {
            data: vec![],
            timestamp: 0.0,
            keyframe: false,
        })
    }

    pub async fn finish(&mut self) -> Result<(), crate::RecorderError> {
        self.running = false;
        Ok(())
    }
}
