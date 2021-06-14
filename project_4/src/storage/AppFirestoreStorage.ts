import NoteInterface from "../interfaces/Note";
import Storage from "../interfaces/Storage";

export default class AppFirestoreStorage implements Storage
{
    async save(note: NoteInterface) {
        return false;
    }

    async update(note: NoteInterface) {
        return false;
    }

    async delete(noteId: string) {
        return false;
    }

    async getAll() {
        return [];
    }
}