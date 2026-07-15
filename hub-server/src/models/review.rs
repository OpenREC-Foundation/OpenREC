use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Review {
    pub id: uuid::Uuid,
    pub item_id: uuid::Uuid,
    pub item_type: String,
    pub author_id: uuid::Uuid,
    pub rating: i16,
    pub comment: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateReview {
    pub item_id: uuid::Uuid,
    pub item_type: String,
    pub author_id: uuid::Uuid,
    pub rating: i16,
    pub comment: Option<String>,
}
