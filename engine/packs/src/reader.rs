use crate::{PackConfig, PackError};
use std::path::Path;
use zip::read::ZipArchive;
use std::io::Read;

pub struct PackReader;

impl PackReader {
    pub fn new() -> Self {
        Self
    }

    pub fn read(&self, path: &str) -> Result<PackData, PackError> {
        let path = Path::new(path);
        if !path.exists() {
            return Err(PackError::Io(std::io::Error::new(
                std::io::ErrorKind::NotFound,
                "Pack file not found",
            )));
        }

        let file = std::fs::File::open(path)?;
        let mut archive = ZipArchive::new(file)
            .map_err(|e| PackError::InvalidStructure(format!("Cannot open pack: {e}")))?;

        let mut config_json = None;
        let mut total_size = 0u64;

        for i in 0..archive.len() {
            let mut entry = archive.by_index(i)
                .map_err(|e| PackError::InvalidStructure(format!("Entry error: {e}")))?;
            total_size += entry.size();
            if entry.name() == "config.json" {
                let mut buf = String::new();
                entry.read_to_string(&mut buf)
                    .map_err(|e| PackError::Io(e))?;
                config_json = Some(buf);
            }
        }

        let config_str = config_json.ok_or(PackError::MissingConfig)?;
        let config: PackConfig = serde_json::from_str(&config_str)
            .map_err(|e| PackError::ConfigParse(e.to_string()))?;

        Ok(PackData {
            config,
            size_bytes: total_size,
        })
    }
}

pub struct PackData {
    pub config: PackConfig,
    pub size_bytes: u64,
}
