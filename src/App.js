import React, { useState } from 'react';
import styled from 'styled-components';
import WeatherForecastList from './components/WeatherForecastList/WeatherForecastList';

const AppContainer = styled.div`
  text-align: center;
`;

function App() {
  const [cityName] = useState('Vancouver');

  return (
    <AppContainer>
      <h1>{cityName}</h1>
      <WeatherForecastList cityName={cityName} />
    </AppContainer>
  );
}

export default App;
