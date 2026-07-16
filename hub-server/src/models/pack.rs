use serde::{Deserialize, Serialize};
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pack { pub id: uuid::Uuid, pub name: String }
