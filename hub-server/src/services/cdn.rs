pub async fn upload_file(_client: &aws_sdk_s3::Client, _bucket: &str, _key: &str, _path: &std::path::Path) -> Result<(), Box<dyn std::error::Error>> { Ok(()) }
