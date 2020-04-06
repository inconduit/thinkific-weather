import React, { useState } from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import CityNameForm from './components/CityNameForm/CityNameForm';
import WeatherForecastList from './components/WeatherForecastList/WeatherForecastList';

const AppContainer = styled.div`
  text-align: center;
`;

const ChangeLink = styled.div`
  color: #ccc;
  font-size: 0.6rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function App() {
  const [cityName, setCityName] = useState('Vancouver');
  const [isEditing, setIsEditing] = useState(false);
  const onChangeCityName = (cityName) => {
    if (get(cityName, 'length', '') > 0) {
      setCityName(cityName);
    }
    setIsEditing(false);
  }

  return (
    <AppContainer>
      {isEditing
        ? <CityNameForm
            cityName={cityName}
            onChangeCityName={onChangeCityName}
          />
        : <h1 onClick={() => setIsEditing(true)}>
            {cityName}
          </h1>
      }
      <WeatherForecastList cityName={cityName} />
    </AppContainer>
  );
}

export default App;
