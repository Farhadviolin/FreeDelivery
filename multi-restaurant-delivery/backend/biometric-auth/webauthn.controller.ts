import { Controller, Post, Body } from '@nestjs/common';
@Controller('webauthn')
export class WebauthnController {
  @Post('register')
  async register(@Body() creds: any) {
    const publicKey = await this.webauthnService.generateChallenge();
    return publicKey;
  }
  @Post('login')
  async login(@Body() assertion: any) {
    const user = await this.webauthnService.verifyAssertion(assertion);
    return this.authService.issueJwt(user);
  }
}
