use actix_web::{web, HttpResponse, get};
use crate::AppState;
use crate::models::plugin::Plugin;

#[get("/plugins")]
async fn list_plugins(state: web::Data<AppState>) -> HttpResponse {
    let plugins = sqlx::query_as!(Plugin, "SELECT * FROM plugins ORDER BY downloads DESC LIMIT 50")
        .fetch_all(&state.db)
        .await;
    match plugins {
        Ok(plugins) => HttpResponse::Ok().json(plugins),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/plugins/{id}")]
async fn get_plugin(state: web::Data<AppState>, path: web::Path<uuid::Uuid>) -> HttpResponse {
    let id = path.into_inner();
    let plugin = sqlx::query_as!(Plugin, "SELECT * FROM plugins WHERE id = $1", id)
        .fetch_optional(&state.db)
        .await;
    match plugin {
        Ok(Some(plugin)) => HttpResponse::Ok().json(plugin),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(list_plugins)
       .service(get_plugin);
}
