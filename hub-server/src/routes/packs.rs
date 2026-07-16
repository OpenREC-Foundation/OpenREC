use actix_web::{web, HttpResponse, get};
use crate::AppState;

#[get("/packs")]
async fn list_packs(state: web::Data<AppState>) -> HttpResponse { HttpResponse::Ok().json("[]") }
#[get("/packs/{id}")]
async fn get_pack(state: web::Data<AppState>, path: web::Path<uuid::Uuid>) -> HttpResponse { HttpResponse::Ok().json("{}") }
pub fn configure(cfg: &mut web::ServiceConfig) { cfg.service(list_packs).service(get_pack); }
