import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // this check will be removed when I decide on a domain & configure CORS
  if (process.env.NODE_ENV === 'production')
    throw new Error("You Haven't Set Up CORS Blocking!");
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);

  await app.listen(config.get('PORT'));
}
bootstrap();
