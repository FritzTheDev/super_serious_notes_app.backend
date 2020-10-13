import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {}

  async createNote(note: Note): Promise<Note> {
    const savedNote = await this.noteRepo.save(note);
    savedNote.owner.email = undefined;
    return savedNote;
  }

  async getOwnedNotes(user: User): Promise<Note[]> {
    return this.noteRepo.find({ where: { owner: user } });
  }
}
