import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OPENWEATHER_API_KEY = '927ba7bebf60c07e4ecef3eb658be4a1';

const buildForecastURL = (cityName) => (
  `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${OPENWEATHER_API_KEY}`
);

export default ({ cityName }) => {
  const forecastURL = buildForecastURL(cityName);
  const [isError, setIsError] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchForecast = async () => {
      setIsError(false);

      try {
        const result = await axios(forecastURL);

        setWeatherData(result);
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
