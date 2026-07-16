use crate::PluginError;
pub struct WasmBridge;
impl WasmBridge {
    pub fn new() -> Self { Self }
    pub async fn call(&self, _plugin: &str, _func: &str, _args: &[u8]) -> Result<Vec<u8>, PluginError> { Err(PluginError::NotFound("".into())) }
}
