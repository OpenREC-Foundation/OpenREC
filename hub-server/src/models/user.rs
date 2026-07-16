use serde::{Deserialize, Serialize};
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User { pub id: uuid::Uuid, pub username: String }
