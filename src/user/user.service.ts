import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { User } from './user.entity';
import { makeConfirmEmail } from 'src/emails/makeConfirmEmail';

@Injectable()
export class UserService {
  transporter: nodemailer.Transporter;
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport(process.env.SMTP_STRING);
  }

  async register(user: User): Promise<User> {
    user.password = await hash(user.password, 10);
    await this.transporter.sendMail({
      from: 'Super Serious <fritz@superseriousnoteapp.com>',
      to: user.email,
      subject: 'Complete Your Super Serious Note App Registration',
      html: makeConfirmEmail(user.emailVerificationToken),
      text: `Follow this Super Serious link to confirm your Super Serious email address: 
      https://superseriousnoteapp.com/verify/${user.emailVerificationToken}`,
    });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }
}
