import ColorInterface from "../interfaces/Color";

export default class Color implements ColorInterface 
{
    private _hexColor = "";

    public get HexColor() {
        return this._hexColor;
    }

    public set HexColor(color: string) {
        this._hexColor = color;
    }
}