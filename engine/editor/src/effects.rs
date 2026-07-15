use serde_json;
use std::collections::HashMap;

#[derive(Debug, thiserror::Error)]
pub enum EffectError {
    #[error("Unknown effect: {0}")]
    UnknownEffect(String),
    #[error("Invalid parameters: {0}")]
    InvalidParams(String),
}

pub struct EffectProcessor {
    active_effects: HashMap<String, Vec<(String, serde_json::Value)>>, // clip_id -> [(effect_name, params)]
}

impl EffectProcessor {
    pub fn new() -> Self {
        Self {
            active_effects: HashMap::new(),
        }
    }

    pub fn apply_effect(&mut self, clip_id: &str, effect_name: &str, params: serde_json::Value) -> Result<(), EffectError> {
        match effect_name {
            "zoom" | "shake" | "fade" | "speed" | "blur" => {
                let entry = self.active_effects.entry(clip_id.to_string()).or_insert_with(Vec::new);
                entry.push((effect_name.to_string(), params));
                Ok(())
            }
            _ => Err(EffectError::UnknownEffect(effect_name.to_string())),
        }
    }

    pub fn remove_effect(&mut self, clip_id: &str, effect_name: &str) {
        if let Some(effects) = self.active_effects.get_mut(clip_id) {
            effects.retain(|(name, _)| name != effect_name);
        }
    }

    pub fn get_effects(&self, clip_id: &str) -> Vec<&(String, serde_json::Value)> {
        self.active_effects.get(clip_id).map(|v| v.iter().collect()).unwrap_or_default()
    }

    pub fn process_frame(&self, _clip_id: &str, frame: &[u8], _time: f64) -> Vec<u8> {
        // In a real implementation, apply GLSL shaders or image processing
        frame.to_vec()
    }
}
