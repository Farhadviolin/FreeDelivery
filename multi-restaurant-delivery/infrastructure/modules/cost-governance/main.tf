variable "cloud" { type = string }
variable "project" { type = string }

resource "aws_cur_report_definition" "this" {
  count = var.cloud == "aws" ? 1 : 0
  report_name = "${var.project}-cost"
  time_unit = "HOURLY"
  format = "textORcsv"
  compression = "GZIP"
  s3_bucket = "${var.project}-cost-reports"
  s3_region = "eu-central-1"
  additional_schema_elements = ["RESOURCES"]
}

resource "google_billing_account_iam_member" "this" {
  count = var.cloud == "gcp" ? 1 : 0
  billing_account_id = "..."
  role = "roles/billing.viewer"
  member = "serviceAccount:cost-viewer@${var.project}.iam.gserviceaccount.com"
}
