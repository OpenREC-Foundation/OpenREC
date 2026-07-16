use crate::{PluginError, PluginManifest};
pub struct PluginRuntime;
impl PluginRuntime {
    pub fn new() -> Result<Self, PluginError> { Ok(Self) }
    pub async fn load_module(&mut self, _path: &str, _manifest: &PluginManifest) -> Result<(), PluginError> { Ok(()) }
}
