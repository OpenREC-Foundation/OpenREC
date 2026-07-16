use crate::AIError;
pub struct BitrateEnhancer;
impl BitrateEnhancer {
    pub fn new() -> Result<Self, AIError> { Ok(Self) }
    pub async fn enhance(&self, _input: &[u8]) -> Result<Vec<u8>, AIError> { Err(AIError::ModelNotLoaded("BitrateEnhancer".into())) }
}
