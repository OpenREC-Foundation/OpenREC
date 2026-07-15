pub mod capture;
pub mod buffer;
pub mod audio;
pub mod encoder;

use std::sync::Arc;
use parking_lot::RwLock;
use tokio::sync::mpsc;
use openrec_core::Project;
use crate::capture::{ScreenCapture, CameraCapture, CaptureConfig};
use crate::buffer::CircularBuffer;
use crate::audio::{AudioCapture, AudioConfig};
use crate::encoder::{Encoder, EncoderConfig, EncodedFrame};

#[derive(Debug, thiserror::Error)]
pub enum RecorderError {
    #[error("Capture error: {0}")]
    Capture(String),
    #[error("Audio error: {0}")]
    Audio(String),
    #[error("Encoder error: {0}")]
    Encoder(String),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
    #[error("Already recording")]
    AlreadyRecording,
    #[error("Not recording")]
    NotRecording,
}

pub struct Recorder {
    config: Arc<RwLock<RecorderConfig>>,
    screen_capture: Option<ScreenCapture>,
    camera_capture: Option<CameraCapture>,
    audio_capture: Option<AudioCapture>,
    buffer: Arc<CircularBuffer>,
    encoder: Option<Encoder>,
    is_recording: bool,
    is_paused: bool,
    duration: f64,
}

#[derive(Debug, Clone)]
pub struct RecorderConfig {
    pub video: CaptureConfig,
    pub audio: AudioConfig,
    pub encoder: EncoderConfig,
    pub max_buffer_seconds: u32,
    pub output_path: String,
}

impl Recorder {
    pub fn new(config: RecorderConfig) -> Self {
        let buffer = Arc::new(CircularBuffer::new(
            config.max_buffer_seconds as usize * 60,
            config.video.resolution.width,
            config.video.resolution.height,
        ));
        Self {
            config: Arc::new(RwLock::new(config)),
            screen_capture: None,
            camera_capture: None,
            audio_capture: None,
            buffer,
            encoder: None,
            is_recording: false,
            is_paused: false,
            duration: 0.0,
        }
    }

    pub async fn start(&mut self) -> Result<(), RecorderError> {
        if self.is_recording {
            return Err(RecorderError::AlreadyRecording);
        }

        let config = self.config.read().clone();

        self.screen_capture = Some(ScreenCapture::new(config.video.clone())?);
        if config.audio.enabled {
            self.audio_capture = Some(AudioCapture::new(config.audio.clone())?);
        }
        self.encoder = Some(Encoder::new(config.encoder.clone())?);

        self.screen_capture.as_mut().unwrap().start().await?;
        if let Some(audio) = &mut self.audio_capture {
            audio.start().await?;
        }

        self.is_recording = true;
        self.is_paused = false;
        self.duration = 0.0;

        Ok(())
    }

    pub fn pause(&mut self) -> Result<(), RecorderError> {
        if !self.is_recording {
            return Err(RecorderError::NotRecording);
        }
        self.is_paused = true;
        Ok(())
    }

    pub fn resume(&mut self) -> Result<(), RecorderError> {
        if !self.is_recording {
            return Err(RecorderError::NotRecording);
        }
        self.is_paused = false;
        Ok(())
    }

    pub async fn stop(&mut self) -> Result<(), RecorderError> {
        if !self.is_recording {
            return Err(RecorderError::NotRecording);
        }

        if let Some(screen) = &mut self.screen_capture {
            screen.stop().await?;
        }
        if let Some(audio) = &mut self.audio_capture {
            audio.stop().await?;
        }
        if let Some(encoder) = &mut self.encoder {
            encoder.finish().await?;
        }

        self.is_recording = false;
        self.is_paused = false;
        self.screen_capture = None;
        self.audio_capture = None;
        self.encoder = None;

        Ok(())
    }

    pub fn get_buffer_status(&self) -> (f64, f64) {
        let current = self.buffer.seconds_available();
        let max = self.config.read().max_buffer_seconds as f64;
        (current, max)
    }

    pub fn get_audio_levels(&self) -> (f32, f32) {
        if let Some(audio) = &self.audio_capture {
            audio.get_levels()
        } else {
            (0.0, 0.0)
        }
    }

    pub fn save_buffer_clip(&self) -> Result<String, RecorderError> {
        let clip = self.buffer.snapshot();
        let path = format!("clips/{}.mp4", uuid::Uuid::new_v4());
        std::fs::create_dir_all("clips").map_err(RecorderError::Io)?;
        // Encoder escreveria o buffer em disco
        Ok(path)
    }
  }
