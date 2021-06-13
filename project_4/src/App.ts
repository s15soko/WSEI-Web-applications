import NoteCreator from "./creators/NoteCreator";
import Note from "./entities/Note";
import Notes from "./entities/Notes";
import CreateNoteInterface from "./interfaces/CreateNote";

export default class App implements CreateNoteInterface
{
    noteCreator: NoteCreator;
    notes: Notes;

    constructor()
    {
        this.noteCreator = new NoteCreator(this);
        this.notes = new Notes();
    }

    public createNote(note: Note)
    {
        console.log("create note: ", note);
    }
}