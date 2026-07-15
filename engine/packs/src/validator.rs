use crate::{PackData, PackError};

pub fn validate_pack(pack: &PackData) -> Result<(), PackError> {
    let config = &pack.config;

    if config.name.trim().is_empty() {
        return Err(PackError::Validation("Pack name cannot be empty".into()));
    }
    if config.version.trim().is_empty() {
        return Err(PackError::Validation("Version cannot be empty".into()));
    }
    if config.author.trim().is_empty() {
        return Err(PackError::Validation("Author cannot be empty".into()));
    }

    // Validate AI rules if present
    if let Some(rules) = &config.ai_overrides {
        if !rules.is_object() {
            return Err(PackError::Validation("ai_overrides must be an object".into()));
        }
    }

    Ok(())
}
