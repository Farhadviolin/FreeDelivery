package authz

test_admin_allowed {
  allow with input as {"method": "GET", "path": ["admin"], "token": {"roles": ["admin"]}}
}

test_health_allowed {
  allow with input as {"method": "GET", "path": ["health"], "token": {"roles": ["user"]}}
}

test_user_denied {
  not allow with input as {"method": "POST", "path": ["admin"], "token": {"roles": ["user"]}}
}
