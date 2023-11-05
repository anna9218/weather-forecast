// interface Props {
//   name: string;
// }

import { useEffect, useState } from 'react';
import background from '../assets/background.svg';
import clouds from '../assets/icons/clouds.svg';
import clear from '../assets/icons/clear.svg';
import rain from '../assets/icons/rain.svg';
import thunder from '../assets/icons/thunder.svg';

function WeatherCard({ weatherData }: any) {
  let icon;

  if (weatherData.weatherCode === 800) {
    icon = clear;
  } else if (weatherData.weatherCode > 800) {
    icon = clouds;
  } else if (weatherData.weatherCode >= 500 && weatherData.weatherCode < 600) {
    icon = rain;
  } else if (weatherData.weatherCode >= 200 && weatherData.weatherCode < 300) {
    icon = thunder;
  }

  // const weatherIcons = {
  //   '800': clear,
  //   // '90X': extreme,
  //   '80X': clouds,
  //   // '70X': atmosphere,
  //   // '60X': snow,
  //   '50X': rain,
  //   // '30X': drizzle,
  //   '20X': thunder,
  // };

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
