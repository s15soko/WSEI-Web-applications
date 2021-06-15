import NoteCreator from "./controllers/NoteCreator";
import NoteControllerInterface from "./interfaces/NoteController";
import NoteInterface from "./interfaces/Note";
import StorageInterface from "./interfaces/Storage";
import AppFirestoreStorage from "./storage/AppFirestoreStorage";
import AppStorage from "./storage/AppStorage";
import Notes from "./controllers/Notes";
import config from "./config";

export default class App implements NoteControllerInterface {

    private _storageType = "";

    noteCreator: NoteCreator;
    concrete: StorageInterface;

    constructor(storageType = "") {

        if (storageType !== "") {
            this._storageType = storageType;
        }

        this.noteCreator = new NoteCreator(this);
        this.concrete = this.getStorageService();
    }

    //

    public getStorageType(): string
    {
        if(this._storageType !== "") {
            return this._storageType;
        }

        return config.storage;
    }

    public getStorageService(): StorageInterface {

        const type = this.getStorageType();

        if (type === "firebase") return new AppFirestoreStorage();
        return new AppStorage();
    }

    //

    public async createNote(note: NoteInterface) {
        let result = await this.concrete.save(note);
        if (result) {
            this.renderNotes()
        }

        return result;
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

    public async getAllNotes()
    {
        return await this.concrete.getAll(); 
    }

    public async renderNotes()
    {
        const notes = new Notes(await this.getAllNotes(), this);
        notes.render();
    }
}