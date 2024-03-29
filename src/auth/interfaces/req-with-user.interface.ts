import { Request } from 'express';
import { User } from 'src/user/user.entity';

export interface ReqWithUser extends Request {
  user: User;
}
