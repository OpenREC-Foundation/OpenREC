use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Plugin {
    pub id: uuid::Uuid,
    pub name: String,
    pub version: String,
    pub author_id: uuid::Uuid,
    pub description: Option<String>,
    pub permissions: Option<Vec<String>>,
    pub file_url: String,
    pub file_size: i64,
    pub downloads: i64,
    pub rating_total: f64,
    pub rating_count: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
