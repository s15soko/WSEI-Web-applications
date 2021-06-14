import NoteInterface from "../interfaces/Note";
import NoteControllerInterface from "../interfaces/NoteController";

export default class NoteBuilder {

    private _note: NoteInterface;
    private _noteController: NoteControllerInterface;

    constructor(note: NoteInterface, noteController: NoteControllerInterface) {
        this._note = note;
        this._noteController = noteController;
    }

    generateElement()
    {
        const root = document.createElement("div");
        root.classList.add("note-container");
        root.style.backgroundColor = this._note.Color.HexColor;       
        
        root.append(this.header());
        root.append(this.content());
        root.append(this.footer());

        return root;
    }

    private header()
    {
        const header = document.createElement("div");
        header.classList.add("header");

        const headerContentText = document.createElement("span");
        headerContentText.innerHTML = this._note.Title;

        header.append(headerContentText);

        return header;
    }

    private content()
    {
        const content = document.createElement("div");
        content.classList.add("content");

        const contentContentText = document.createElement("span");
        contentContentText.innerHTML = this._note.Content;

        content.append(contentContentText);

        return content;
    }

    private footer()
    {
        const footer = document.createElement("div");
        footer.classList.add("footer");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.classList.add("btn")
        deleteButton.addEventListener("click", () => {
            this._noteController.deleteNote(this._note.Id);
        });

        const pinnedButton = document.createElement("button");
        pinnedButton.textContent = this._note.Pinned ? "unpin" : "pin";
        pinnedButton.classList.add("btn")
        pinnedButton.addEventListener("click", () => {
            let note = this._note;
            note.Pinned = !note.Pinned;
            this._noteController.updateNote(note);
        });

        footer.append(deleteButton);
        footer.append(pinnedButton);


        return footer;
    }
}