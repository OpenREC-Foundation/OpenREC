use actix_cors::Cors;
use actix_web::{web, App, HttpServer, middleware};
use sqlx::postgres::PgPoolOptions;
use std::env;

mod routes;
mod models;
mod services;

pub struct AppState { pub db: sqlx::PgPool }

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL");
    let pool = PgPoolOptions::new().max_connections(10).connect(&database_url).await.expect("Pool");
    let data = web::Data::new(AppState { db: pool });

    HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin().allow_any_method().allow_any_header();
        App::new().wrap(cors).wrap(middleware::Logger::default()).app_data(data.clone()).configure(routes::configure)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
