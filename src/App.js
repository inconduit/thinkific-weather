import React from 'react';
import './App.css';
import WeatherForecastList from './components/WeatherForecastList/WeatherForecastList';

function App() {
  return (
    <div className="App">
      <WeatherForecastList cityName='Vancouver' />
    </div>
  );
}

export default App;
