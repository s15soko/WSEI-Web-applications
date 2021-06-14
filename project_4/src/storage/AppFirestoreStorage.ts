import NoteInterface from "../interfaces/Note";
import Storage from "../interfaces/Storage";

export default class AppFirestoreStorage implements Storage
{
    save(note: NoteInterface): boolean {
        throw new Error("Method not implemented.");
    }

    delete(noteId: string): boolean {
        throw new Error("Method not implemented.");
    }

    getAll(): NoteInterface[] {
        throw new Error("Method not implemented.");
    }
}