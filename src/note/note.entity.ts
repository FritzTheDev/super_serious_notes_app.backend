import { IsBoolean, IsEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @IsEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmpty()
  @CreateDateColumn()
  created: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updated: Date;

  @IsBoolean()
  @Column()
  public: boolean;

  @IsBoolean()
  @Column()
  unlisted: boolean;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.notes)
  owner: User;
}
