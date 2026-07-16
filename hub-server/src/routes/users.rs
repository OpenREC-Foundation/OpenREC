use actix_web::{web, HttpResponse, get};
use crate::AppState;

#[get("/creators/{username}")]
async fn get_creator(state: web::Data<AppState>, path: web::Path<String>) -> HttpResponse { HttpResponse::Ok().json("{}") }
pub fn configure(cfg: &mut web::ServiceConfig) { cfg.service(get_creator); }
