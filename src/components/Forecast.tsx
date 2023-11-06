import { fetchWeather, getLocationWeather } from '../services/openWeather';
import WeatherCard from './WeatherCard';
import { useEffect, useState, useRef, useMemo } from 'react';
import debounce from 'lodash.debounce';
import './Forecast.scss';
import { WeatherData } from './WeatherCard';

function Forecast() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [locationsWeather, setLocationsWeather] = useState<WeatherData[]>([]);

  // INFO: useEffect only upon update -> for the api call
  const didUpdateLatLong = useRef(false);

  // INFO: for current location
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
    // INFO: to prevent making 3 requests instead of 1 with updated latlong values
    if (didUpdateLatLong.current) {
      fetchWeather(latitude, longitude).then((data) => {
        if (data) {
          setWeatherData(extractWeatherData(data));
        }
      });
    }
  }, [latitude, longitude]);

  function handleChange(event: any) {
    if (event.target.value.length > 0) {
      getLocationWeather(event.target.value).then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];

          fetchWeather(lat, lon).then((data) => {
            // INFO: check if already added
            const isDuplicate = locationsWeather.some((location) => {
              return location.name === data.name + ', ' + data.sys.country;
            });

            if (!isDuplicate)
              setLocationsWeather((prev) => {
                return [...prev, extractWeatherData(data)];
              });
          });
        } else {
          console.log('Weather data is undefined');
        }
      });
    }
  }

  // INFO: debounce opt to allow the use finish typing, without making multuiple requests
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
          className='weather-search--input'
          onChange={debouncedResults}
        ></input>
      </div>
      <div className='weather-cards'>
        {Object.keys(weatherData).length !== 0 && (
          <WeatherCard weatherData={weatherData} />
        )}
        {locationsWeather?.map((locationWeather) => {
          return <WeatherCard weatherData={locationWeather} />;
        })}
      </div>
    </div>
  );
}

export default Forecast;
