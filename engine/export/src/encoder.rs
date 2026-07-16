use crate::ExportConfig;
pub struct VideoEncoder { config: ExportConfig }
impl VideoEncoder {
    pub fn new(config: ExportConfig) -> Self { Self { config } }
    pub fn finish(&mut self) -> Result<(), crate::ExportError> { Ok(()) }
}
