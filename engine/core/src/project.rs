use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Resolution {
    pub width: u32,
    pub height: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub created: DateTime<Utc>,
    pub last_modified: DateTime<Utc>,
    pub duration: f64,
    pub resolution: Resolution,
    pub frame_rate: f64,
    pub preview_url: Option<String>,
    pub source: ProjectSource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ProjectSource {
    Recorder,
    Import,
}

impl Project {
    pub fn new(name: String, width: u32, height: u32, frame_rate: f64) -> Self {
        let now = Utc::now();
        Self {
            id: Uuid::new_v4().to_string(),
            name,
            created: now,
            last_modified: now,
            duration: 0.0,
            resolution: Resolution { width, height },
            frame_rate,
            preview_url: None,
            source: ProjectSource::Recorder,
        }
    }
}
