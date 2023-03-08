import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgWeather from '/bgWeather.png';
import Navbar from './Navbar';

const Weather = () => {
  const [position, setposition] = useState(null);
  const [weather, setweather] = useState({});
  const [temperature, setTemperature] = useState(false);

  /* Get position lat, lon */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setposition({ lat, lon });
    });
  }, []);

  const API_key = '35c192c1cb176b12148a658573df8cc5';

  /* Get weather data */
  useEffect(() => {
    if (position) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_key}`,
        )
        .then((res) => {
          setweather(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [position]);

  // console.log(weather);

  const backgroundWeather = { backgroundImage: `url(${bgWeather})` };

  /* Function to convert temperature */
  const tFahrenheit = (temp) => (temp * 9) / 5 + 32;

  const changeTemperature = () => {
    setTemperature((temperature) => !temperature);
  };

  /* Code to change weather images */
  const weatherImages = {
    'clear sky': 'https://i.postimg.cc/RCNpY73M/clear-sky.png',
    'few clouds': 'https://i.postimg.cc/SRMn0YhZ/few-clouds.png',
    'Broken clouds': 'https://i.postimg.cc/QMf9crmq/broken-clouds.png',
    'overcast clouds': 'https://i.postimg.cc/fWpqQVXY/scattered-clouds.png',
    'scattered clouds': 'https://i.postimg.cc/fWpqQVXY/scattered-clouds.png',
    'light rain': 'https://i.postimg.cc/KzV1srdk/rain.png',
    'moderate rain': 'https://i.postimg.cc/SN9TSm73/shower-rain.png',
    mist: 'https://i.postimg.cc/MG6fcG7T/mist.png',
    snow: 'https://i.postimg.cc/G9nHb33b/snow.png',
    'thunderstorm with rain': 'https://i.postimg.cc/gJrwDBBb/thunderstorm.png',
  };

  function getWeatherImage(description) {
    if (description in weatherImages) {
      return weatherImages[description];
    } else {
      return 'https://i.postimg.cc/RCNpY73M/clear-sky.png';
    }
  }

 
  return (
    <div>
      <Navbar />
      <div
        className="text-blue-600 mt-32 h-60 bg-center bg-no-repeat bg-contain flex flex-col items-center justify-center"
        style={backgroundWeather}
      >
        <div className="relative right-28 pl-2 bottom-6">
          <div className="relative">
            <img
              className="absolute left-52 w-96 top-5"
              src={getWeatherImage(weather.weather?.[0].description.toLowerCase())}
              alt="weatherImg"
            />
          </div>
          <p className="pl-2 text-5xl pb-6 pt-10">
            {temperature
              ? Math.round(tFahrenheit(weather.main?.temp - 273.15)) + '°F'
              : Math.round(weather.main?.temp - 273.15) + '°C'}
          </p>
          <div className="pl-2 text-xs flex flex-col gap-1">
            <p>WIND: {weather.wind?.speed} m/s</p>
            <p>CLOUDS: {weather.clouds?.all} %</p>
            <p>PRESSURE: {weather.main?.pressure} hPa</p>
          </div>
          <div className="relative">
            <p className="pt-6 pl-3 text-xl font-semibold">
              {weather.name}, {weather.sys?.country}
            </p>
            <p className="absolute left-64 bottom-1 text-right">
              {weather.weather?.[0].description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          className="bg-blue-400 rounded-xl text-white px-6 py-2 font-semibold"
          onClick={changeTemperature}
        >
          {temperature ? 'Toggle to C°' : 'Toggle to F°'}
        </button>
      </div>
    </div>
  );
};

export default Weather;
