pub enum HardwareEncoder { Nvenc, Vaapi, VideoToolbox, None }
pub fn detect_hardware() -> HardwareEncoder { HardwareEncoder::None }
