import NoteInterface from "../interfaces/Note";
import NoteControllerInterface from "../interfaces/NoteController";
import NoteBuilder from "./../builders/NoteBuilder";

export default class Notes {
    private _notes: NoteInterface[] = [];
    private _noteController: NoteControllerInterface;

    public pinnedNotesContainer: HTMLElement | null = null;
    public notPinnedNotesContainer: HTMLElement | null = null;

    constructor(notes: NoteInterface[], noteController: NoteControllerInterface) {
        this._notes = notes;
        this._noteController = noteController;

        this.pinnedNotesContainer = <HTMLElement>document.getElementById("pinned-notes-container");
        this.notPinnedNotesContainer = <HTMLElement>document.getElementById("not-pinned-notes-container");
    }

    //

    public render() {
        if (this.pinnedNotesContainer !== null) {
            this.pinnedNotesContainer.innerHTML = "";
        }

        if (this.notPinnedNotesContainer !== null) {
            this.notPinnedNotesContainer.innerHTML = "";
        }

        if (this.pinnedNotesContainer !== null && this.notPinnedNotesContainer !== null) {
           
            this._notes.forEach(note => {
                let noteBuilder = new NoteBuilder(note, this._noteController);
                
                if (note.Pinned) {
                    this.pinnedNotesContainer?.append(noteBuilder.generateElement())
                } else {
                    this.notPinnedNotesContainer?.append(noteBuilder.generateElement())
                }
            });
        }
    }
}