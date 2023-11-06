import axios from 'axios';

// TODO - hide key for security purposes
const OPEN_WEATHER_API_KEY = 'YOUR_API_KEY';
const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_API = 'http://api.openweathermap.org/geo/1.0/direct';

/**
 * Get the weather data for corresponding to the parameters
 * @param latitude
 * @param longitude
 * @returns object of weather data
 */
export async function fetchWeather(latitude: number, longitude: number) {
  return axios
    .get(
      `${OPEN_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error.message));
}

/**
 * Provide a string location, and get the coresponding lat long values
 * @param location
 * @returns lat long values
 */
export async function getLocationWeather(location: string) {
  return axios
    .get(`${GEOCODING_API}?q=${location}&appid=${OPEN_WEATHER_API_KEY}`)
    .then((response) => response.data)
    .catch((error) => console.log(error.message));
}
