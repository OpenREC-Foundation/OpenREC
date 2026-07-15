use actix_web::{web, HttpResponse, get};
use crate::AppState;
use crate::models::user::User;

#[get("/creators/{username}")]
async fn get_creator(state: web::Data<AppState>, path: web::Path<String>) -> HttpResponse {
    let username = path.into_inner();
    let user = sqlx::query_as!(User, "SELECT * FROM users WHERE username = $1", username)
        .fetch_optional(&state.db)
        .await;
    match user {
        Ok(Some(user)) => HttpResponse::Ok().json(user),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(get_creator);
}
