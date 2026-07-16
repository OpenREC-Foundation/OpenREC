use actix_web::{web, HttpResponse, get};
use crate::AppState;

#[get("/plugins")]
async fn list_plugins(state: web::Data<AppState>) -> HttpResponse { HttpResponse::Ok().json("[]") }
#[get("/plugins/{id}")]
async fn get_plugin(state: web::Data<AppState>, path: web::Path<uuid::Uuid>) -> HttpResponse { HttpResponse::Ok().json("{}") }
pub fn configure(cfg: &mut web::ServiceConfig) { cfg.service(list_plugins).service(get_plugin); }
