import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AccessTokenObject } from './interfaces/access-token-object.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    // get the user based on its email.
    const user = await this.userService.findByEmail(email);
    // If findByEmail returns null, then so should this.
    if (!user) return null;
    // check the password
    const match = await compare(password, user.password);
    if (match) return user;

    return null;
  }

  // If I can think of a better name for this return value interface, I should change it.
  login(user: User): AccessTokenObject {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // If I can think of a better name for this return value interface, I should change it.
  async register(user: User): Promise<AccessTokenObject> {
    const savedUser = await this.userService.register(user);
    const payload = {
      username: user.username,
      email: savedUser.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
