resource "aws_lambda_function" "image_optimizer" {
  function_name = "image-optimizer"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  memory_size   = 512
  timeout       = 30
  filename      = "build/image-optimizer.zip"
  role          = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_event_rule" "image_opt_rule" {
  name        = "image-optimize-rule"
  event_pattern = jsonencode({ "source": ["ki-lief.image"] })
}

resource "aws_cloudwatch_event_target" "opt_target" {
  rule      = aws_cloudwatch_event_rule.image_opt_rule.name
  target_id = "ImageOptimizer"
  arn       = aws_lambda_function.image_optimizer.arn
}
