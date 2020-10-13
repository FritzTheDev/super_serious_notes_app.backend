import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessTokenObject } from './interfaces/access-token-object.interface';
import { ReqWithUser } from './interfaces/req-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<AccessTokenObject> {
    return this.authService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ReqWithUser): Promise<AccessTokenObject> {
    return this.authService.login(req.user);
  }
}
