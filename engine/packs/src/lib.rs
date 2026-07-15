pub mod reader;
pub mod validator;

use serde::{Deserialize, Serialize};
use std::path::PathBuf;

#[derive(Debug, thiserror::Error)]
pub enum PackError {
    #[error("Invalid pack structure: {0}")]
    InvalidStructure(String),
    #[error("Missing config.json")]
    MissingConfig,
    #[error("Config parse error: {0}")]
    ConfigParse(String),
    #[error("Validation error: {0}")]
    Validation(String),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PackConfig {
    pub name: String,
    pub version: String,
    pub author: String,
    pub description: String,
    pub category: Option<String>,
    pub tags: Vec<String>,
    #[serde(default)]
    pub ai_overrides: Option<serde_json::Value>,
    #[serde(default)]
    pub dependencies: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PackInfo {
    pub id: String,
    pub config: PackConfig,
    pub path: PathBuf,
    pub size_bytes: u64,
    pub installed: bool,
}

pub struct PackManager {
    packs_dir: PathBuf,
    installed: Vec<PackInfo>,
}

impl PackManager {
    pub fn new(packs_dir: PathBuf) -> Self {
        Self {
            packs_dir,
            installed: Vec::new(),
        }
    }

    pub fn install_pack(&mut self, pack_path: &str) -> Result<PackInfo, PackError> {
        let reader = reader::PackReader::new();
        let pack = reader.read(pack_path)?;
        validator::validate_pack(&pack)?;

        let pack_id = uuid::Uuid::new_v4().to_string();
        let dest = self.packs_dir.join(&pack_id);
        std::fs::create_dir_all(&dest)?;

        let info = PackInfo {
            id: pack_id,
            config: pack.config,
            path: dest,
            size_bytes: pack.size_bytes,
            installed: true,
        };

        self.installed.push(info.clone());
        Ok(info)
    }

    pub fn list_installed(&self) -> &[PackInfo] {
        &self.installed
    }

    pub fn get_pack(&self, pack_id: &str) -> Option<&PackInfo> {
        self.installed.iter().find(|p| p.id == pack_id)
    }
}
