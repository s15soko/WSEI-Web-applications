import NoteCreator from "./creators/NoteCreator";
import Notes from "./entities/Notes";
import CreateNoteInterface from "./interfaces/CreateNote";
import NoteInterface from "./interfaces/Note";
import StorageInterface from "./interfaces/Storage";
import AppFirestoreStorage from "./storage/AppFirestoreStorage";
import AppStorage from "./storage/AppStorage";

export default class App implements CreateNoteInterface {
    noteCreator: NoteCreator;
    notes: Notes;
    concrete: StorageInterface;

    constructor() {
        this.noteCreator = new NoteCreator(this);
        this.notes = new Notes();
        this.concrete = this.getStorageService();
    }

    public createNote(note: NoteInterface) {
        this.saveNote(note);
    }

    public deleteNote(noteId: string): void {
        this.concrete.delete(noteId);
    }

    private saveNote(note: NoteInterface) {
        this.concrete.save(note);
    }

    private getStorageService(): StorageInterface {
        if (1 == 1) return new AppFirestoreStorage();
        return new AppStorage();
    }
}