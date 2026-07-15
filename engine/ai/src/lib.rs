pub mod super_resolution;
pub mod bitrate_enhance;
pub mod audio_enhance;
pub mod editor_ai;

use openrec_core::MediaClip;
use serde::{Deserialize, Serialize};

#[derive(Debug, thiserror::Error)]
pub enum AIError {
    #[error("Model not loaded: {0}")]
    ModelNotLoaded(String),
    #[error("Inference error: {0}")]
    Inference(String),
    #[error("Invalid input: {0}")]
    InvalidInput(String),
    #[error("Unsupported operation: {0}")]
    Unsupported(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AIResult<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AISuggestion {
    pub id: String,
    pub description: String,
    pub suggestion_type: SuggestionType,
    pub timestamp: f64,
    pub confidence: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum SuggestionType {
    Cut,
    Effect { name: String },
    Transition { name: String },
    Text { content: String },
    Audio,
}

pub struct AIEngine {
    super_resolution: super_resolution::SuperResolution,
    bitrate_enhancer: bitrate_enhance::BitrateEnhancer,
    audio_enhancer: audio_enhance::AudioEnhancer,
    editor: editor_ai::EditorAI,
}

impl AIEngine {
    pub fn new() -> Result<Self, AIError> {
        Ok(Self {
            super_resolution: super_resolution::SuperResolution::new()?,
            bitrate_enhancer: bitrate_enhance::BitrateEnhancer::new()?,
            audio_enhancer: audio_enhance::AudioEnhancer::new()?,
            editor: editor_ai::EditorAI::new(),
        })
    }

    pub async fn upscale(
        &self,
        clip: &MediaClip,
        target_resolution: &str,
    ) -> Result<Vec<u8>, AIError> {
        self.super_resolution.upscale(clip, target_resolution).await
    }

    pub async fn enhance_bitrate(&self, clip: &MediaClip) -> Result<Vec<u8>, AIError> {
        self.bitrate_enhancer.enhance(clip).await
    }

    pub async fn enhance_audio(
        &self,
        clip: &MediaClip,
        options: audio_enhance::AudioEnhancementOptions,
    ) -> Result<Vec<u8>, AIError> {
        self.audio_enhancer.enhance(clip, options).await
    }

    pub async fn analyze_project(
        &self,
        clips: &[MediaClip],
    ) -> Result<Vec<AISuggestion>, AIError> {
        self.editor.analyze(clips).await
    }
}
