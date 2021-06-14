import Note from "../entities/Note";
import NoteControllerInterface from "../interfaces/NoteController";

/**
 * Note creator class for controlling html creator including events.
 */
export default class NoteCreator 
{
    private _note: Note;
    private _noteController: NoteControllerInterface;
    private _defaultBackgroundHexColor = "#fff";

    private _title = "";
    private _content = "";

    public set Title(title: string) {
        this._title = title;
        this._note.Title = title;

        if(this.createNoteTitleInput !== null) {
            this.createNoteTitleInput.value = title;
        }
    }

    public set Content(content: string) {
        this._content = content;
        this._note.Content = content;

        if(this.createNoteContentInput !== null) {
            this.createNoteContentInput.value = content;
        }
    }

    //

    public selfContainer: HTMLElement | null = null;
    public createNoteTitleInput: HTMLInputElement | null = null;
    public createNoteContentInput: HTMLInputElement | null = null;
    public createNoteBtnClose: HTMLButtonElement | null = null;
    public colorPickerButton: HTMLButtonElement | null = null;
    public colorPaletteContainer: HTMLElement | null = null;

    //

    constructor(noteController: NoteControllerInterface) 
    {
        this._note = new Note();
        this._noteController = noteController;

        this.selfContainer = <HTMLElement>document.getElementById("create-note-container");
        this.createNoteContentInput = <HTMLInputElement>document.getElementById("create-note-content-input");
        this.createNoteTitleInput = <HTMLInputElement>document.getElementById("create-note-title-input");
        this.colorPickerButton = <HTMLButtonElement>document.getElementById("color-picker-button");
        this.createNoteBtnClose = <HTMLButtonElement>document.getElementById("footer-close-btn");
        this.colorPaletteContainer = <HTMLElement>document.getElementById("color-palette-container");

        this.initEvents();
    }

    private initEvents()
    {
        const colorPickers = <NodeListOf<HTMLElement>> this.colorPaletteContainer?.querySelectorAll(".color-picker");

        if(colorPickers)
        {
            colorPickers.forEach(colorPicker => {
                colorPicker.addEventListener("click", (event) => {
                    let target = <HTMLElement> event.target;
                    let hexColor = target.getAttribute("attr-hex-color");

                    if(hexColor !== null) {
                        this._note.Color.HexColor = hexColor;
                        this.setSelfContainerColor(hexColor);
                    }
                });
            });
        }

        this.createNoteTitleInput?.addEventListener("input", (event) => {
            const target = <HTMLInputElement>event.target;
            const value = target.value;
            this.Title = value;
        });

        this.createNoteContentInput?.addEventListener("input", (event) => {
            const target = <HTMLInputElement>event.target;
            const value = target.value;
            this.Content = value;
        });

        if(this.createNoteContentInput != null)
        {
            const createNoteContainer = this.getNoteContainer();
            this.createNoteContentInput.addEventListener('focus', (event) => {
                this.showNotVisibleElements();
            }); 

            document.addEventListener('click', (event) => {
                const target = <Node> event.target;

                if (target !== createNoteContainer && !createNoteContainer.contains(target)) {
                    this.close();
                }
            });
        } 

        this.colorPickerButton?.addEventListener("click", (event) => {
            this.togglePaletteContainer();
        });

        this.createNoteBtnClose?.addEventListener("click", (event) => {
            this.close();
        });
    }

    //

    protected togglePaletteContainer() {
        this.colorPaletteContainer?.classList.toggle("color-palette-container-active");
    }

    protected showPaletteContainer() {
        this.colorPaletteContainer?.classList.add("color-palette-container-active");
    }

    protected hidePaletteContainer() {
        this.colorPaletteContainer?.classList.remove("color-palette-container-active");
    }

    protected getNotVisibleElements() {
        const createNoteContainer = this.getNoteContainer();
        return <NodeListOf<HTMLElement>>createNoteContainer?.querySelectorAll(".not-visible");
    }

    public getNoteContainer() {
        return <HTMLElement>document.getElementById("create-note-container");
    }

    public showNotVisibleElements() {
        const elements = this.getNotVisibleElements();

        elements.forEach(notVisibleElement => {
            notVisibleElement.classList.add("visible");
        });
    }

    public hideNotVisibleElements() {
        const elements = this.getNotVisibleElements();

        elements.forEach(notVisibleElement => {
            notVisibleElement.classList.remove("visible");
        });
    }

    //

    public setDefaultSelfContainerColor() {
        if(this.selfContainer !== null) {
            this.selfContainer.style.backgroundColor = this._defaultBackgroundHexColor;
        }
    }

    public setSelfContainerColor(hexColor: string | null)
    {
        if(this.selfContainer !== null && hexColor !== null) {
            this.selfContainer.style.backgroundColor = hexColor;
        }
    }

    //

    public clear() {
        this.Title = "";
        this.Content = "";
        this._note = new Note();
        this.setDefaultSelfContainerColor();
        this.hidePaletteContainer();
    }

    private canCreateNote() {
        return this._note.Title !== "" || this._note.Content !== "";
    }

    public close(createOnClose = true) {
        if (createOnClose && this.canCreateNote()) {
            this._noteController.createNote(this._note);
        }

        this.hideNotVisibleElements();
        this.clear();        
    }
}