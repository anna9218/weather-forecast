import background from '../assets/background.svg';
import clouds from '../assets/icons/clouds.svg';
import clear from '../assets/icons/clear.svg';
import rain from '../assets/icons/rain.svg';
import thunder from '../assets/icons/thunder.svg';

interface Props {
  weatherData: WeatherData;
}

export interface WeatherData {
  name?: string;
  temp?: number;
  high?: number;
  low?: number;
  weatherCode?: number;
  description?: string;
}

function WeatherCard({ weatherData }: Props) {
  let icon;

  // INFO: codes indicate the weather conditions, taken fron Open Weather
  // used common codes only
  if (weatherData?.weatherCode && weatherData.weatherCode === 800) {
    icon = clear;
  } else if (weatherData?.weatherCode && weatherData.weatherCode > 800) {
    icon = clouds;
  } else if (
    weatherData?.weatherCode &&
    weatherData.weatherCode >= 500 &&
    weatherData.weatherCode < 600
  ) {
    icon = rain;
  } else if (
    weatherData?.weatherCode &&
    weatherData.weatherCode >= 200 &&
    weatherData.weatherCode < 300
  ) {
    icon = thunder;
  }

  return (
    <div className='weather-card'>
      <img src={background} alt='SVG Icon' />
      <img className='card-icon' src={icon} />

      <div>
        <div className='card-temp'>{weatherData.temp}&deg;</div>

        <div className='card-bottom'>
          <div className='card-bottom--name'>{weatherData.name}</div>
          <div className='card-bottom--description'>
            {weatherData.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
