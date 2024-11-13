/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

// Middleware function to log request details
function logRequestDetails(req: Request, res: Response, next: NextFunction) {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  app.use(cookieParser());
  app.use(logRequestDetails);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
