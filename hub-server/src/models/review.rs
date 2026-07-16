use serde::{Deserialize, Serialize};
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Review { pub id: uuid::Uuid, pub rating: i16 }
