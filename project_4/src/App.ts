import NoteCreator from "./controllers/NoteCreator";
import NoteControllerInterface from "./interfaces/NoteController";
import NoteInterface from "./interfaces/Note";
import StorageInterface from "./interfaces/Storage";
import AppFirestoreStorage from "./storage/AppFirestoreStorage";
import AppStorage from "./storage/AppStorage";
import Notes from "./controllers/Notes";

export default class App implements NoteControllerInterface {
    noteCreator: NoteCreator;
    concrete: StorageInterface;

    constructor() {
        this.noteCreator = new NoteCreator(this);
        this.concrete = this.getStorageService();
    }

    //

    private saveNote(note: NoteInterface) {
        this.concrete.save(note);
        this.renderNotes();
    }

    private getStorageService(): StorageInterface {
        let a = 2; // todo
        if (1 == a) return new AppFirestoreStorage();
        return new AppStorage();
    }

    //

    public async createNote(note: NoteInterface) {
        this.saveNote(note);
        return true;
    }

    public async updateNote(note: NoteInterface) {
        let result = await this.concrete.update(note);
        if (result) {
            this.renderNotes()
        }

        return result;
    }

    public async deleteNote(noteId: string) {
        let result = await this.concrete.delete(noteId);
        if (result) {
            this.renderNotes()
        }
        
        return result;
    }

    //

    public async renderNotes()
    {
        const notes = new Notes(await this.concrete.getAll(), this);
        notes.render();
    }
}