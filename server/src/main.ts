import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.SERVER_HOST;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: process.env.CLIENT_HOST,
      credentials: true,
    });
    app.use(cookieParser());
    await app.listen(PORT, HOST, () =>
      console.log(`Server started on ${HOST} ${PORT}`),
    );
  } catch (error) {}
}

start();
