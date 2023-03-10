import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgWeather from '/bgWeather.png';
import Loader from './Loader';

const Weather = () => {
  const [position, setposition] = useState(null);
  const [weather, setweather] = useState({});
  const [temperature, setTemperature] = useState(false);
  const [loader, setLoader] = useState(true);
  const [city, setCity] = useState('');

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
    if (position || city) {
      const url = position
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}&appid=${API_key}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
      axios
        .get(url)
        .then((res) => {
          setweather(res.data);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [position, city]);

  console.log(weather);

  /* Get city of input */
  const getCityInput = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
      .then((res) => {
        setweather(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backgroundWeather = { backgroundImage: `url(${bgWeather})` };

  /* Function to convert temperature */
  const tFahrenheit = (temp) => (temp * 9) / 5 + 32;

  const changeTemperature = () => {
    setTemperature((temperature) => !temperature);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <nav className="flex justify-evenly pt-10">
            <h1 className="text-white text-lg mr-32">Wheather App</h1>
            <div className="mt-4 absolute top-20">
              <input
                className="py-2 px-2 rounded"
                type="text"
                placeholder="Enter city or town"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                onClick={getCityInput}
                className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </div>
            <button>
              <img className="h-5" src="/btn.png" alt="" />
            </button>
          </nav>
          <div
            className="text-blue-600 mt-32 h-60 bg-center bg-no-repeat bg-contain flex flex-col items-center justify-center"
            style={backgroundWeather}
          >
            <div className="relative right-28 pl-4 bottom-6">
              <div className="relative">
                <img
                  className="absolute left-52 w-96 top-5"
                  src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                  alt="weatherImg"
                />
              </div>
              <p className="pl-2 text-7xl pb-6 pt-10">
                {temperature
                  ? Math.round(tFahrenheit(weather.main?.temp - 273.15)) + '°'
                  : Math.round(weather.main?.temp - 273.15) + '°'}
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
      )}
    </>
  );
};

export default Weather;
