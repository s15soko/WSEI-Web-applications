import NoteInterface from "./Note";

export default interface Storage { 
    save(note: NoteInterface): boolean;
    delete(noteId: string): boolean;
    getAll(): NoteInterface[];
}