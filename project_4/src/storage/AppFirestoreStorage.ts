import Note from "../entities/Note";
import db from "../instances/firebase";
import NoteInterface, { FirebaseDbNoteStorage } from "../interfaces/Note";
import Storage from "../interfaces/Storage";

export default class AppFirestoreStorage implements Storage
{
    private db;

    constructor()
    {
        this.db = db;
    }

    //

    private loadNote(note: FirebaseDbNoteStorage, id: string) {
        let newNote = new Note();
        newNote.Id = id;
        newNote.Title = note.title;
        newNote.Content = note.content;
        newNote.Pinned = note.pinned;
        newNote.CreatedAt = note.created_at;
        newNote.Color.HexColor = note.hex_color;
        return newNote;
    }

    private loadStorageNote(note: NoteInterface)
    {
        let attr: FirebaseDbNoteStorage = {
            title: note.Title,
            content: note.Content,
            pinned: note.Pinned,
            created_at: note.CreatedAt,
            hex_color: note.Color.HexColor,
        };

        return attr;
    }

    //

    async save(note: NoteInterface) {

        try {
            const newNote = this.loadStorageNote(note);
            await this.db.collection('notes').add(newNote);
            return true;
        } catch (error) {}

        return false;
    }

    async update(note: NoteInterface) {
        try {
            await this.db.collection('notes').doc(note.Id).update(this.loadStorageNote(note));
            return true;
        } catch (error) {}
        
        return false;
    }

    async delete(noteId: string) {
        try {
            await this.db.collection('notes').doc(noteId).delete();
            return true;
        } catch (error) {}

        return false;
    }

    async getAll() {

        let res: NoteInterface[] = [];

        try {
            res = await this.db.collection('notes').get().then(response => {
            
                const notes: NoteInterface[] = [];
                response.docs.forEach(data => {
                    const note = data.data() as FirebaseDbNoteStorage;
                    notes.push(this.loadNote(note, data.id));
                });
    
                return notes;
            });
        } catch (error) {}

        return res;
    }
}