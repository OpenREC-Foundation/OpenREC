use crate::PluginError;
pub struct Sandbox;
impl Sandbox {
    pub fn new() -> Self { Self }
    pub fn validate_permissions(&self, _permissions: &[String]) -> Result<(), PluginError> { Ok(()) }
}
