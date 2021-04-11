export interface IClouds {
    all: number;
}

export interface ICoord {
    lat: number;
    lon: number;
}

export interface ISys {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
}

export interface ICityWeather {
    [index: number]: ICityWeather;
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface IMain {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface IWind {
    deg: number;
    gust: number;
    speed: number;
}

export default interface ICity {
    base: string;
    clouds: IClouds;
    cod: number;
    coord: ICoord;
    dt: number;
    id: number;
    main: IMain;
    name: string;
    sys: ISys;
    weather: ICityWeather;
    wind: IWind;
}