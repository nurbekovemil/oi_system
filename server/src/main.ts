import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';

async function start() {
  const bootstrapLogger = new Logger('Bootstrap');
  let fileLogger: LoggingService | null = null;

  try {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.SERVER_HOST;
    const app = await NestFactory.create(AppModule);
    fileLogger = app.get(LoggingService);

    app.enableCors({
      origin: process.env.CLIENT_HOST,
      credentials: true,
    });
    app.use(cookieParser());
    await app.listen(PORT, HOST);
    await fileLogger.log(`Server started on ${HOST} ${PORT}`, 'Bootstrap');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown bootstrap error';
    const trace = error instanceof Error ? error.stack : undefined;

    bootstrapLogger.error(message, trace);
    const fallbackLogger = fileLogger ?? new LoggingService();
    await fallbackLogger.error(message, trace, 'Bootstrap');
  }
}

start();
