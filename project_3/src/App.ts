export default class App 
{
    private apiKey = "50d53005c0fd5f556bb4ef15224c4209";

    public async getCityInfo(city: string) {
        return await this.getWeather(city);
    }

    private async getWeather(city: string): Promise<any> {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}`;
        const response = await fetch(url);
        return await response.json();
    }
}