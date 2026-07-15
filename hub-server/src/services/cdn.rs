use aws_sdk_s3::Client;
use std::path::Path;

pub async fn upload_file(
    client: &Client,
    bucket: &str,
    key: &str,
    file_path: &Path,
) -> Result<(), Box<dyn std::error::Error>> {
    let body = aws_sdk_s3::primitives::ByteStream::from_path(file_path).await?;
    client
        .put_object()
        .bucket(bucket)
        .key(key)
        .body(body)
        .send()
        .await?;
    Ok(())
}

pub async fn get_download_url(
    client: &Client,
    bucket: &str,
    key: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let req = client
        .get_object()
        .bucket(bucket)
        .key(key);
    let presigned = req.presigned(
        aws_sdk_s3::presigning::PresigningConfig::expires_in(
            std::time::Duration::from_secs(3600)
        )
    ).await?;
    Ok(presigned.uri().to_string())
}
