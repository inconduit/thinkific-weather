import React, { useState, useEffect } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import styled from 'styled-components';
import DailyForecastListItem from '../DailyForecastListItem/DailyForecastListItem';

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

const WeatherForecastList = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 700px;

  > div {
    flex: 1 1 auto;
    padding: 0 0.8rem;

    &:not(:last-of-type) {
      border-right: 1px solid #ccc;
    }
  }

  @media (max-width: 600px) {
    display: inline;

    > div {
      padding: 2rem 0;

      &:nth-child(even) {
        background: #ddd;
      }
    }
  }
`;

export default ({ cityName }) => {
  const fiveDayForecastURL = buildFiveDayForecastURL(cityName);
  const [isError, setIsError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const fiveDaySummary = get(weatherData, 'data.daily', []).slice(0, 5);

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
  }, [cityName]);

  return (
    <div>
      {isError && (
        <div>
          {`Error loading forecast for city: ${cityName}`}
        </div>
      )}

      {!isError && fiveDaySummary && (
        <WeatherForecastList>
          { fiveDaySummary.map((dailyForecastData) => (
            <DailyForecastListItem
              key={`key-daily-${dailyForecastData.dt}`}
              data={dailyForecastData}
            />
          ))}
        </WeatherForecastList>
      )}
    </div>
  );
}
