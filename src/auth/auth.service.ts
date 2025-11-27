import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      mfa_required: user.mfaEnabled,
    };
  }

  async setupMfa(userId: number) {
    const secret = speakeasy.generateSecret({ name: 'Amrutam' });
    await this.usersService.updateMfaSecret(userId, secret.base32);
    return { otpauth_url: secret.otpauth_url };
  }

  async verifyMfa(userId: number, token: string) {
    const user = await this.usersService.findOne(userId);
    if (!user.mfaSecret) throw new UnauthorizedException('MFA not set up');
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token,
      window: 2,
    });
    if (!verified) throw new UnauthorizedException('Invalid MFA token');
    return { valid: true };
  }
}