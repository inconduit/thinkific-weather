import React from 'react';
import './App.css';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';

function App() {
  return (
    <div className="App">
      <WeatherForecast cityName='Vancouver' />
    </div>
  );
}

export default App;
