import NoteInterface from "./Note";

export default interface Storage { 
    save(note: NoteInterface): Promise<boolean>;
    update(note: NoteInterface): Promise<boolean>;
    delete(noteId: string): Promise<boolean>;
    getAll(): Promise<NoteInterface[]>;
}