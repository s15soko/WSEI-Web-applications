import ColorInterface from "./Color";

export default interface Note {
    Id: string;
    Title: string;
    Content: string;
    Pinned: boolean;
    CreatedAt: (Date | null);
    Color: ColorInterface;
}

export interface NoteStorage {
    id: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: (Date | null);
    hexColor: string;
}