use actix_cors::Cors;
use actix_web::{web, App, HttpServer, middleware};
use sqlx::postgres::PgPoolOptions;
use std::env;

mod routes;
mod models;
mod services;

pub struct AppState {
    pub db: sqlx::PgPool,
    pub s3_client: aws_sdk_s3::Client,
    pub bucket_name: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let bucket_name = env::var("S3_BUCKET").expect("S3_BUCKET must be set");
    let s3_region = env::var("S3_REGION").unwrap_or_else(|_| "us-east-1".into());

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await
        .expect("Failed to create pool");

    let aws_config = aws_config::from_env()
        .region(aws_credential_types::region::Region::new(s3_region))
        .load()
        .await;
    let s3_client = aws_sdk_s3::Client::new(&aws_config);

    let app_state = web::Data::new(AppState {
        db: pool,
        s3_client,
        bucket_name,
    });

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .app_data(app_state.clone())
            .configure(routes::configure)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
