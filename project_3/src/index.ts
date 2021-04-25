import App from "./App";
import ICity from "./interfaces/Openweathermap";
import { WeatherCardBuilder } from "./WeatherCardBuilder";

const app = new App();
const result = document.getElementById("result");
const searchBtn = document.getElementById("search");
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

let currentItems = app.getItems();
const getCity = () => {
    return searchInput?.value;
}

searchBtn?.addEventListener("click", async function() {
    const cityName = getCity();
    const city: ICity = await app.getCityInfo(cityName);

    currentItems = app.getItems();
    let cityIdentifier = String(city?.id);
    if("id" in city && !currentItems.includes(cityIdentifier)) 
    {
        app.setOrSkip(String(cityIdentifier));
        const builder = new WeatherCardBuilder(city);
        result?.append(builder.build());
    }
});

window.addEventListener("load", function() {
    app.getItems().forEach(async (cityIdentifier: string) => {
        const city = await app.getCityInfo("", Number(cityIdentifier));
        
        if("weather" in city)
        {
            const builder = new WeatherCardBuilder(city);
            result?.append(builder.build());
        }
    });
})