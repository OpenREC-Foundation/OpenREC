use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Pack {
    pub id: uuid::Uuid,
    pub name: String,
    pub version: String,
    pub author_id: uuid::Uuid,
    pub description: Option<String>,
    pub category: Option<String>,
    pub tags: Option<Vec<String>>,
    pub icon: Option<String>,
    pub file_url: String,
    pub file_size: i64,
    pub downloads: i64,
    pub rating_total: f64,
    pub rating_count: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize)]
pub struct PackResponse {
    pub id: uuid::Uuid,
    pub name: String,
    pub version: String,
    pub author: String,
    pub author_avatar: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
    pub tags: Option<Vec<String>>,
    pub icon: Option<String>,
    pub downloads: i64,
    pub rating: f64,
    pub created_at: DateTime<Utc>,
  }
