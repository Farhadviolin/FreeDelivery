import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Sentry from './sentry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}
Sentry.captureMessage('Service gestartet');
bootstrap();
