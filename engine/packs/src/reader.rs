use crate::{PackConfig, PackError};
pub struct PackReader;
impl PackReader {
    pub fn new() -> Self { Self }
    pub fn read(&self, _path: &str) -> Result<PackData, PackError> { Err(PackError::MissingConfig) }
}
pub struct PackData { pub config: PackConfig, pub size_bytes: u64 }
