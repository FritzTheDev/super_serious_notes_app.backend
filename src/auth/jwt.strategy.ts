import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { authConstants } from './constants';
import { TokenData } from './interfaces/TokenData.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  validate(
    payload: TokenData,
  ): { id: string; email: string; username: string } {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
