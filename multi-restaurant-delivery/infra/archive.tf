resource "aws_s3_bucket" "archive" {
  bucket = "delivery-archive"
}
resource "aws_s3_bucket_lifecycle_configuration" "archive_lifecycle" {
  bucket = aws_s3_bucket.archive.id
  rule {
    id      = "to_ia"
    enabled = true
    prefix  = "orders/"
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }
}
