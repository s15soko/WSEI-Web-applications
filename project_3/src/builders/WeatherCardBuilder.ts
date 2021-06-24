import ICity from "../interfaces/Openweathermap";

export class WeatherCardBuilder 
{
    city: ICity;

    getIcon(code: string) {
        return `http://openweathermap.org/img/wn/${code}@2x.png`;
    }

    get Title() {
        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = this.city.name;
        return title;
    }

    get WeatherInfo() {
        const info = document.createElement("div");
        info.classList.add("weatherInfo");

        const img = document.createElement("img");
        img.src = this.getIcon(this.city.weather[0].icon);

        const weather = document.createElement("span");
        weather.textContent = this.city.weather[0].main;

        info.append(img);
        info.append(weather);
        
        return info;
    }

    get CardContent() {
        const content = document.createElement("div");
        content.classList.add("content");

        const temp = document.createElement("span");
        temp.textContent = `Temp: ${this.city.main.temp}`;

        const humidity = document.createElement("span");
        humidity.textContent = `Humidity: ${this.city.main.humidity}`;

        const pressure = document.createElement("span");
        pressure.textContent = `Pressure: ${this.city.main.pressure}`;

        content.append(temp);
        content.append(humidity);
        content.append(pressure);

        return content;
    }

    constructor(city: ICity) {
        this.city = city;
    }

    //

    build(): HTMLElement
    {
        const card = document.createElement("div");
        card.classList.add("weatherCard");
        card.id = String(this.city.id);
        
        card.append(this.Title);
        card.append(this.WeatherInfo);
        card.append(this.CardContent);

        return card;
    }
}