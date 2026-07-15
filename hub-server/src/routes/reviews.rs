use actix_web::{web, HttpResponse, get, post};
use serde::Deserialize;
use crate::AppState;
use crate::models::review::{Review, CreateReview};

#[get("/reviews/{item_type}/{item_id}")]
async fn get_reviews(
    state: web::Data<AppState>,
    path: web::Path<(String, uuid::Uuid)>,
) -> HttpResponse {
    let (item_type, item_id) = path.into_inner();
    let reviews = sqlx::query_as!(
        Review,
        "SELECT * FROM reviews WHERE item_id = $1 AND item_type = $2 ORDER BY created_at DESC",
        item_id, item_type
    )
    .fetch_all(&state.db)
    .await;
    match reviews {
        Ok(reviews) => HttpResponse::Ok().json(reviews),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

#[post("/reviews")]
async fn create_review(
    state: web::Data<AppState>,
    body: web::Json<CreateReview>,
) -> HttpResponse {
    let review = sqlx::query_as!(
        Review,
        "INSERT INTO reviews (item_id, item_type, author_id, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        body.item_id, body.item_type, body.author_id, body.rating, body.comment
    )
    .fetch_one(&state.db)
    .await;
    match review {
        Ok(review) => HttpResponse::Created().json(review),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(get_reviews)
       .service(create_review);
}
