use serde::{Deserialize, Serialize};
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Plugin { pub id: uuid::Uuid, pub name: String }
