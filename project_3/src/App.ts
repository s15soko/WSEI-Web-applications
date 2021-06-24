export default class App 
{
    private apiKey = "14e49f5e4f7411d8d7cc7c4499b3c2aa";
    public storageKey = "weatherItems";

    public getItems() {
        const items = this._getItemsAsString();
        return items ? JSON.parse(items) : [];
    }

    private _getItemsAsString(): string | null {
        return localStorage.getItem(this.storageKey);
    }

    public setOrSkip(cityIdentifier: string) {
        let items = this._getItemsAsString();
        let itemAsArray = items ? JSON.parse(items) : [];

        if(!itemAsArray.includes(cityIdentifier)) {
            itemAsArray.push(cityIdentifier);
            localStorage.setItem(this.storageKey, JSON.stringify(itemAsArray));
        }
    }

    public async getCityInfo(cityName: string = "", cityId: null|number = null) {
        return await this._getWeather(cityName, cityId);
    }

    private async _getWeather(cityName: string = "", cityId: null|number = null): Promise<any> {
        const url = cityId != null
            ? `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${this.apiKey}&units=metric`
            : `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.apiKey}&units=metric`;


        const response = await fetch(url);
        return await response.json();
    }
}