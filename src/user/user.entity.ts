import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  Length,
  NotContains,
} from 'class-validator';
import { Note } from 'src/note/note.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'app_user' })
export class User {
  @IsEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmpty()
  @CreateDateColumn()
  created: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updated: Date;

  @IsEmpty()
  @Column({ default: false })
  emailVerified: boolean;

  @IsEmpty()
  @Generated('uuid')
  emailVerificationToken: string;

  @IsEmpty()
  @Column({ nullable: true, default: null })
  passwordResetRequested: Date;

  @IsEmpty()
  @Column({ nullable: true, default: null })
  passwordResetToken: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsAlphanumeric()
  @Column({ unique: true })
  username: string;

  // stored as a password hash
  @Length(8, 100)
  @NotContains(' ')
  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];
}
