use crate::{ExportConfig, ExportError};

pub struct VideoEncoder {
    config: ExportConfig,
    // Pipeline for ffmpeg sidecar or libavcodec
}

impl VideoEncoder {
    pub fn new(config: ExportConfig) -> Result<Self, ExportError> {
        // Validate codec
        match config.codec.as_str() {
            "h264" | "av1" | "vp9" | "hevc" => {}
            _ => return Err(ExportError::Codec(config.codec.clone())),
        }
        Ok(Self { config })
    }

    pub fn encode_frame(&mut self, frame_data: &[u8], timestamp: f64) -> Result<(), ExportError> {
        // Encode a single frame via hardware or software
        if self.config.hardware_acceleration {
            // Use hw encoder (NVENC, VAAPI, etc.)
        } else {
            // Use software encoder (libx264, libvpx)
        }
        Ok(())
    }

    pub fn finish(&mut self) -> Result<(), ExportError> {
        // Flush encoder and finalize file
        Ok(())
    }
}
