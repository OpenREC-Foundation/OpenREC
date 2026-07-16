use serde_json;
use std::collections::HashMap;
use crate::EditorError;

pub struct EffectProcessor { active: HashMap<String, Vec<(String, serde_json::Value)>> }
impl EffectProcessor {
    pub fn new() -> Self { Self { active: HashMap::new() } }
    pub fn apply_effect(&mut self, clip_id: &str, name: &str, params: serde_json::Value) -> Result<(), EditorError> {
        self.active.entry(clip_id.to_string()).or_default().push((name.to_string(), params));
        Ok(())
    }
}
