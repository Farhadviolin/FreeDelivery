from fastapi import FastAPI, Depends
from fastapi_keycloak import FastAPIKeycloak

app = FastAPI()
keycloak = FastAPIKeycloak(
  server_url="https://auth.delivery.com/",
  client_id="dev-portal",
  client_secret="...",
  admin_client_secret="...",
  realm="delivery"
)
app.include_router(keycloak.router, prefix="/auth")
