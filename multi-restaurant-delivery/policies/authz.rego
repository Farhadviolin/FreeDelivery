package authz

default allow = false

allow {
  input.method == "GET"
  input.path == ["health"]
}

allow {
  input.token.roles[_] == "admin"
}
