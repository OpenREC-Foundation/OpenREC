pub mod timeline;
pub mod render;
pub mod effects;

use openrec_core::{Project, Timeline, Track, MediaClip, MediaType};
use crate::timeline::TimelineController;
use crate::render::RenderEngine;
use crate::effects::EffectProcessor;

#[derive(Debug, thiserror::Error)]
pub enum EditorError {
    #[error("Timeline error: {0}")]
    Timeline(#[from] timeline::TimelineError),
    #[error("Render error: {0}")]
    Render(#[from] render::RenderError),
    #[error("Effect error: {0}")]
    Effect(#[from] effects::EffectError),
    #[error("Project error: {0}")]
    Project(String),
}

pub struct Editor {
    project: Project,
    timeline: TimelineController,
    render_engine: RenderEngine,
    effect_processor: EffectProcessor,
}

impl Editor {
    pub fn new(project: Project) -> Self {
        let timeline = TimelineController::new(project.frame_rate, project.resolution.width, project.resolution.height);
        let render_engine = RenderEngine::new(project.resolution.width, project.resolution.height, project.frame_rate);
        let effect_processor = EffectProcessor::new();
        Self {
            project,
            timeline,
            render_engine,
            effect_processor,
        }
    }

    pub fn get_timeline(&self) -> &Timeline {
        self.timeline.timeline()
    }

    pub fn get_project(&self) -> &Project {
        &self.project
    }

    pub fn add_track(&mut self, name: String, track_type: TrackType) -> Result<String, EditorError> {
        let track = Track::new(name, track_type);
        let id = track.id.clone();
        self.timeline.add_track(track)?;
        Ok(id)
    }

    pub fn remove_track(&mut self, track_id: &str) -> Result<(), EditorError> {
        self.timeline.remove_track(track_id)?;
        Ok(())
    }

    pub fn add_clip_to_track(&mut self, track_id: &str, name: String, source: String, media_type: MediaType, duration: f64) -> Result<String, EditorError> {
        let clip = MediaClip::new(name, source, media_type, duration);
        let clip_id = clip.id.clone();
        self.timeline.add_clip_to_track(track_id, clip)?;
        Ok(clip_id)
    }

    pub fn split_clip(&mut self, clip_id: &str, time: f64) -> Result<(), EditorError> {
        self.timeline.split_clip(clip_id, time)?;
        Ok(())
    }

    pub fn apply_effect(&mut self, clip_id: &str, effect_name: &str, params: serde_json::Value) -> Result<(), EditorError> {
        self.effect_processor.apply_effect(clip_id, effect_name, params)?;
        Ok(())
    }

    pub fn render_frame(&self, time: f64) -> Result<Vec<u8>, EditorError> {
        let frame = self.render_engine.render_frame(&self.timeline.timeline(), time)?;
        Ok(frame)
    }

    pub fn export(&self, output_path: &str, _config: ExportConfig) -> Result<(), EditorError> {
        self.render_engine.export(&self.timeline.timeline(), output_path)?;
        Ok(())
    }
}

#[derive(Debug, Clone)]
pub struct ExportConfig {
    pub codec: String,
    pub bitrate: u32,
    pub resolution: Option<(u32, u32)>,
    pub quality: u8, // 1-100
}
