import axios from 'axios';

// TODO - hide key for security purposes
const OPEN_WEATHER_API_KEY = '793dc133790da68ae9b59470bb584f69';
// const WEATHERBIT_API_KEY = "505b882514a64bafbff0abdeea86fc3f";

const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

const GEOCODING_API = 'http://api.openweathermap.org/geo/1.0/direct';

export async function fetchWeather(latitude: number, longitude: number) {
  return axios
    .get(
      `${OPEN_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    )
    .then((response) => {
      return response.data;
    });
}

export async function getLocationWeather(location: string) {
  return axios
    .get(`${GEOCODING_API}?q=${location}&appid=${OPEN_WEATHER_API_KEY}`)
    .then((response) => response.data);
}
