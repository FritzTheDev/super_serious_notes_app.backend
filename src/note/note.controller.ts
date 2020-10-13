import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReqWithUser } from 'src/auth/interfaces/req-with-user.interface';
import { Note } from './note.entity';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNote(
    @Request() req: ReqWithUser,
    @Body() note: Note,
  ): Promise<Note> {
    note.owner = req.user;
    return this.noteService.createNote(note);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOwnedNotes(@Request() req: ReqWithUser): Promise<Note[]> {
    return this.noteService.getOwnedNotes(req.user);
  }
}
