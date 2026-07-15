use actix_web::{web, HttpResponse, get, post, delete};
use sqlx::PgPool;
use crate::AppState;
use crate::models::pack::{Pack, PackResponse};

#[get("/packs")]
async fn list_packs(state: web::Data<AppState>) -> HttpResponse {
    let packs = sqlx::query_as!(Pack, "SELECT * FROM packs ORDER BY downloads DESC LIMIT 50")
        .fetch_all(&state.db)
        .await;
    match packs {
        Ok(packs) => HttpResponse::Ok().json(packs),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[get("/packs/{id}")]
async fn get_pack(state: web::Data<AppState>, path: web::Path<uuid::Uuid>) -> HttpResponse {
    let id = path.into_inner();
    let pack = sqlx::query_as!(Pack, "SELECT * FROM packs WHERE id = $1", id)
        .fetch_optional(&state.db)
        .await;
    match pack {
        Ok(Some(pack)) => HttpResponse::Ok().json(pack),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(list_packs)
       .service(get_pack);
}
