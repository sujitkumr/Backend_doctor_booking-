
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  constructor(@InjectRedis() private readonly redis: Redis) {}

async use(req: Request, res: Response, next: NextFunction) {
  try {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const idempKey = req.headers['idempotency-key'] as string;
      if (idempKey) {
        const cached = await this.redis.get(`idemp:${idempKey}`);
        if (cached) {
          return res.json(JSON.parse(cached));
        }
        (req as any).idempotencyKey = idempKey;
      }
    }
    next();
  } catch (err) {
    console.error('IdempotencyMiddleware error:', err);
    next(); // don't crash the request
  }
}
}