import NoteInterface from "./../interfaces/Note";

export default class Note implements NoteInterface 
{
    private _title = "";
    private _content = "";
    private _pinned = false;
    private _createdAt: Date | null = null;

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get content(): string {
        return this._content;
    }

    public set content(content: string) {
        this._content = content;
    }

    public get pinned(): boolean {
        return this._pinned;
    }

    public set pinned(pinned: boolean) {
        this._pinned = pinned;
    } 

    public get createdAt(): (Date | null) {
        return this._createdAt;
    }

    public set createdAt(createdAt: (Date | null)) {
        this._createdAt = createdAt;
    }
}