use crate::{AIError, AISuggestion};
use openrec_core::MediaClip;

pub struct EditorAI;
impl EditorAI {
    pub fn new() -> Self { Self }
    pub async fn analyze(&self, _clips: &[MediaClip]) -> Result<Vec<AISuggestion>, AIError> { Ok(vec![]) }
}
