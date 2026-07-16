use actix_web::{web, HttpResponse, get, post};
use crate::AppState;

#[get("/reviews/{item_type}/{item_id}")]
async fn get_reviews(state: web::Data<AppState>, path: web::Path<(String, uuid::Uuid)>) -> HttpResponse { HttpResponse::Ok().json("[]") }
#[post("/reviews")]
async fn create_review(state: web::Data<AppState>) -> HttpResponse { HttpResponse::Created().json("{}") }
pub fn configure(cfg: &mut web::ServiceConfig) { cfg.service(get_reviews).service(create_review); }
