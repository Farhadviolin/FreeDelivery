path "transit/keys/personal_data" {
  capabilities = ["create","update","encrypt","decrypt"]
}

path "transit/encrypt/personal_data" {
  capabilities = ["update"]
}

path "transit/decrypt/personal_data" {
  capabilities = ["update"]
}
