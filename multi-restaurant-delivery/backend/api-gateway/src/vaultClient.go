package vault

import (
  "github.com/hashicorp/vault/api"
)

func GetKey(keyName string) ([]byte, error) {
  client, _ := api.NewClient(nil)
  data, err := client.Logical().Read("transit/keys/" + keyName)
  if err != nil {
    return nil, err
  }
  // parse key data (e.g. base64 decode)
  // ...
  return nil, nil // TODO: return decodedKey
}
