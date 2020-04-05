import React, { useState, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';

const API_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const OPENWEATHER_API_KEY = '927ba7bebf60c07e4ecef3eb658be4a1';
const VANCOUVER_LAT = '49.2497';
const VANCOUVER_LONG = '-123.1193';

const buildFiveDayForecastURL = (cityName) => (
  `${API_BASE_URL}/forecast?` +
    `q=${cityName}` +
    `&units=metric` +
    `&appid=${OPENWEATHER_API_KEY}`
);

const buildOneCallForecastURL = (latitude, longitude) => (
  `${API_BASE_URL}/onecall?` +
    `lat=${latitude}` +
    `&lon=${longitude}` +
    `&units=metric` +
    `&appid=${OPENWEATHER_API_KEY}`
);

export default ({ cityName }) => {
  const fiveDayForecastURL = buildFiveDayForecastURL(cityName);
  const [isError, setIsError] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchForecast = async () => {
      setIsError(false);

      try {
        let latitude, longitude, oneCallForecastURL, oneCallResult;
        const fiveDayResult = await axios(fiveDayForecastURL);

        latitude = get(fiveDayResult, 'data.city.coord.lat');
        longitude = get(fiveDayResult, 'data.city.coord.lon');
        oneCallForecastURL = buildOneCallForecastURL(latitude, longitude);
        oneCallResult = await axios(oneCallForecastURL);

        setWeatherData(oneCallResult);
      } catch (error) {
        setIsError(true);
      }
    }

    fetchForecast();
  }, []);

  return (
    <div>
      { isError && (
        <div>
          {`Error loading forecast for city: ${cityName}`}
        </div>
      )}

      { !isError && weatherData && (
        <>
          <div>{`Forecast for ${cityName}`}</div>

          <div>{JSON.stringify(weatherData)}</div>
        </>
      )}
    </div>
  );
}
