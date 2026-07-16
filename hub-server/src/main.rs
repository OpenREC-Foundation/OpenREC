use actix_cors::Cors;
use actix_web::{web, App, HttpServer, middleware, HttpResponse};
use actix_files::Files;
use sqlx::postgres::PgPoolOptions;
use std::env;

mod routes;
mod models;
mod services;

pub struct AppState {
    pub db: sqlx::PgPool,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();

    let database_url = env::var("DATABASE_URL").unwrap_or_else(|_| {
        eprintln!("DATABASE_URL not set – running without database");
        String::new()
    });

    let data = if !database_url.is_empty() {
        let pool = PgPoolOptions::new()
            .max_connections(10)
            .connect(&database_url)
            .await
            .expect("Failed to create pool");
        web::Data::new(AppState { db: pool })
    } else {
        web::Data::new(AppState {
            db: PgPoolOptions::new().max_connections(1).connect_lazy("").expect("unreachable"),
        })
    };

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .app_data(data.clone())
            .configure(routes::configure)
            .service(Files::new("/", "./static").index_file("index.html"))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
