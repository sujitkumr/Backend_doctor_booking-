import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';
import { ValidationPipe } from '@nestjs/common';
import { IdempotencyMiddleware } from './common/middleware/idempotency.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = app.get(Logger);

  app.useLogger(logger);
  app.use(helmet());
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // ← This will return 400 if role is invalid
    transform: true,
    stopAtFirstError: true,
  }),
);

  const redis = createClient({ url: config.get('REDIS_URL') });
  await redis.connect();

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({ sendCommand: (...args: string[]) => redis.sendCommand(args as any) }),
    }),
  );

  // app.use(IdempotencyMiddleware);

  await app.listen(3000);
}
bootstrap();