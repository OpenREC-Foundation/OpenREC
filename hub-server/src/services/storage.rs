use sqlx::PgPool;
use uuid::Uuid;

pub async fn get_file_url(pool: &PgPool, item_id: Uuid, item_type: &str) -> Option<String> {
    match item_type {
        "pack" => {
            let result = sqlx::query_scalar!("SELECT file_url FROM packs WHERE id = $1", item_id)
                .fetch_optional(pool)
                .await
                .ok()?;
            result
        }
        "plugin" => {
            let result = sqlx::query_scalar!("SELECT file_url FROM plugins WHERE id = $1", item_id)
                .fetch_optional(pool)
                .await
                .ok()?;
            result
        }
        _ => None,
    }
}
