import Note from "./Note";

export default interface CreateNote {
    createNote(note: Note): void;
    deleteNote(noteId: string): void;
}