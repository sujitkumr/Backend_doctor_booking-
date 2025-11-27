// src/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt'; // ✅ now installed
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/user.service'; // ✅ plural path

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(
  private configService: ConfigService,
  private usersService: UsersService,
) {
  const jwtSecret = configService.get<string>('JWT_SECRET');
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: jwtSecret,
  });
}

  async validate(payload: any) {
    return this.usersService.findOne(payload.sub);
  }
}