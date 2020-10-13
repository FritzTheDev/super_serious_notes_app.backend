import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: process.env.DATABASE_SYNC === '1',
      autoLoadEntities: true,
    }),
    NoteModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
