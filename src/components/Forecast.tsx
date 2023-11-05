import { fetchWeather, getLocationWeather } from '../services/openWeather';
import WeatherCard from './WeatherCard';
import { useEffect, useState, useRef, useMemo } from 'react';
import debounce from 'lodash.debounce';
import './Forecast.scss';

function Forecast() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [locationsWeather, setLocationsWeather] = useState<Object[]>([]);

  // for useeffect only upon update -> for the api call
  const didUpdateLatLong = useRef(false);

  // for current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        didUpdateLatLong.current = true;
      });
    }
  });

  function extractWeatherData(data: any) {
    console.log(data);
    return {
      name: data.name + ', ' + data.sys.country,
      temp: Math.round(data.main.temp),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      weatherCode: data.weather[0]?.id,
      description: data.weather[0]?.main,
    };
  }

  useEffect(() => {
    // to prevent making 3 requests instead of 1 with updated latlong values
    if (didUpdateLatLong.current) {
      fetchWeather(latitude, longitude).then((data) => {
        setWeatherData(extractWeatherData(data));
      });
    }
  }, [latitude, longitude]);

  function handleChange(event: any) {
    getLocationWeather(event.target.value).then((data) => {
      const { lat, lon } = data[0];

      fetchWeather(lat, lon).then((data) => {
        setLocationsWeather((prev) => {
          return [...prev, extractWeatherData(data)];
        });
      });
    });
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);

  return (
    <div className='forecast'>
      <div className='forecast-header'>
        <h1>Weather</h1>
      </div>
      <div className='weather-search'>
        <input
          type='text'
          placeholder='search for a city or airport'
          onChange={debouncedResults}
        ></input>
      </div>
      <div className='weather-cards'>
        <WeatherCard weatherData={weatherData} />
        {locationsWeather?.map((locationWeather) => {
          return <WeatherCard weatherData={locationWeather} />;
        })}
      </div>
    </div>
  );
}

export default Forecast;
