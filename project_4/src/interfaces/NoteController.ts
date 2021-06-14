import Note from "./Note";

export default interface NoteController {
    createNote(note: Note): Promise<boolean>;
    updateNote(note: Note): Promise<boolean>;
    deleteNote(noteId: string): Promise<boolean>;
}