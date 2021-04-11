interface ICityWeather {
    [index: number]: ICityWeather;
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface ICity {
    name: string;
    weather: ICityWeather;
}

export class WeatherCardBuilder 
{
    city: ICity;

    get title() {
        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = this.city.name;
        return title;
    }

    get weatherInfo() {
        const info = document.createElement("span");
        info.classList.add("weatherInfo");
        info.textContent = this.city.weather[0].main;
        return info;
    }

    constructor(city: ICity) {
        this.city = city;
    }

    build(): HTMLElement
    {
        const card = document.createElement("div");
        card.classList.add("weatherCard");
        
        card.append(this.title);
        card.append(this.weatherInfo);

        return card;
    }
}