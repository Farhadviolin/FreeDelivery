package pdv.authz

default allow = false

allow {
  input.token.roles[_] == "data_privacy_officer"
}

allow {
  input.action == "self_access"
  input.user_id == input.token.user_id
}
