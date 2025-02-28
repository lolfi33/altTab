import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Port du serveur sinon 3000
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
