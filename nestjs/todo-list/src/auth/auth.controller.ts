import { Controller } from '@nestjs/common';

import { Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Request() req): object {
    return { access_token: this.authService.getToken(req.user) };
  }
}
