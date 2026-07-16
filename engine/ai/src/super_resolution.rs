use crate::AIError;
pub struct SuperResolution;
impl SuperResolution {
    pub fn new() -> Result<Self, AIError> { Ok(Self) }
    pub async fn upscale(&self, _input: &[u8], _target: &str) -> Result<Vec<u8>, AIError> { Err(AIError::ModelNotLoaded("SuperResolution".into())) }
}
