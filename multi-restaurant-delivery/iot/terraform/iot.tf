resource "aws_iot_thing" "kitchen_device" {
  name = "smart-kitchen-device"
}

resource "aws_iot_certificate" "device_cert" {
  active = true
}

resource "aws_iot_policy" "device_policy" {
  name   = "SmartKitchenPolicy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["iot:Connect","iot:Publish","iot:Subscribe","iot:Receive"]
      Resource = "*"
    }]
  })
}

resource "aws_iot_policy_attachment" "attach" {
  policy_name = aws_iot_policy.device_policy.name
  target      = aws_iot_certificate.device_cert.arn
}

resource "aws_iot_thing_principal_attachment" "attach" {
  thing_name = aws_iot_thing.kitchen_device.name
  principal  = aws_iot_certificate.device_cert.arn
}
