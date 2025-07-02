import { UserManager } from "oidc-client-ts";
export const userManager = new UserManager({
  authority: "https://auth.kilief.com/auth/realms/ki-lief",
  client_id: "web-app",
  redirect_uri: "https://app.kilief.com/callback",
  response_type: "code",
  scope: "openid profile email"
});
