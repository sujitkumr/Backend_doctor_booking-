import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { LoginDto } from './dto/login.dto';
import { MfaDto } from './dto/mfa.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/setup')
  async setupMfa(@Request() req) {
    return this.authService.setupMfa(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/verify')
  async verifyMfa(@Request() req, @Body() { token }: MfaDto) {
    return this.authService.verifyMfa(req.user.id, token);
  }
}