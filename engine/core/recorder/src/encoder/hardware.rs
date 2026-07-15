use crate::RecorderError;

pub enum HardwareEncoder {
    Nvenc,
    Vaapi,
    VideoToolbox,
    None,
}

pub fn detect_hardware() -> HardwareEncoder {
    #[cfg(target_os = "linux")]
    {
        if std::path::Path::new("/dev/dri/renderD128").exists() {
            return HardwareEncoder::Vaapi;
        }
    }
    #[cfg(target_os = "windows")]
    {
        return HardwareEncoder::Nvenc;
    }
    #[cfg(target_os = "macos")]
    {
        return HardwareEncoder::VideoToolbox;
    }
    HardwareEncoder::None
}
