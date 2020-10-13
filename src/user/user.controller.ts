import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqWithUser } from 'src/auth/interfaces/req-with-user.interface';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req: ReqWithUser): Promise<User> {
    return req.user;
  }
}
