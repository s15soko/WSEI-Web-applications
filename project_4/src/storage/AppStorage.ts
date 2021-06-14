import Note from "../entities/Note";
import NoteInterface, { NoteStorage as NoteStorageInterface } from "../interfaces/Note";
import Storage from "../interfaces/Storage";

export default class AppStorage implements Storage
{
    private _localStorageKey = "notes";

    //

    private getCurrentNotes() {
        return localStorage.getItem(this._localStorageKey);
    }

    private getCurrentNotesAsStorageObjects()
    {
        const notes = this.getCurrentNotes();
        if (notes !== null) {
            return JSON.parse(notes) as Array<NoteStorageInterface>;
        }

        return [];
    }

    private saveInStorage(currents: NoteStorageInterface[]) {
        localStorage.setItem(this._localStorageKey, JSON.stringify(currents));
    }

    private loadNote(note: NoteStorageInterface) {
        let newNote = new Note();
        newNote.Id = note.id;
        newNote.Title = note.title;
        newNote.Content = note.content;
        newNote.Pinned = note.pinned;
        newNote.CreatedAt = note.createdAt;
        newNote.Color.HexColor = note.hexColor;
        return newNote;
    }

    //

    save(note: NoteInterface): boolean {
        
        let attr: NoteStorageInterface = {
            id: note.Id,
            title: note.Title,
            content: note.Content,
            pinned: note.Pinned,
            createdAt: note.CreatedAt,
            hexColor: note.Color.HexColor,
        };

        let items = this.getCurrentNotesAsStorageObjects();
        items.push(attr);

        this.saveInStorage(items);
        return true;
    }

    delete(noteId: string): boolean {
        
        let items = this.getCurrentNotesAsStorageObjects();

        for(let i = 0; i < items.length; i++) {
            if (items[i].id === noteId) {
                items.splice(i, 1);
                this.saveInStorage(items);
                return true;
            }
        }

        return false;
    }
    
    getAll(): NoteInterface[] {
        let items = this.getCurrentNotesAsStorageObjects();
        let notes: NoteInterface[] = [];

        for(let i = 0; i < items.length; i++) {
            let attr = items[i];
            notes.push(this.loadNote(attr));
        }

        return notes;
    }
}