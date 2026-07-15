use actix_web::web;

mod packs;
mod plugins;
mod users;
mod reviews;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .configure(packs::configure)
            .configure(plugins::configure)
            .configure(users::configure)
            .configure(reviews::configure)
    );
}
