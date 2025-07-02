provider "cloudflare" {
  email   = var.cf_email
  api_key = var.cf_api_key
}

resource "cloudflare_worker_script" "geo_trigger" {
  name    = "geo-trigger"
  content = file("../../edge/worker/src/index.ts")
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_lambda_function" "order_handler" {
  function_name = "orderEventHandler"
  runtime       = "nodejs18.x"
  handler       = "handler.handler"
  filename      = "../../serverless/lambda/package.zip"
  role          = aws_iam_role.lambda_exec.arn
}

resource "aws_api_gateway_rest_api" "api" {
  name = "DeliveryAPI"
}
