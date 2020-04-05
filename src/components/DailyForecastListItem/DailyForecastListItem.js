import React from 'react';
import get from 'lodash/get';
import styled from 'styled-components';

const DayTemperature = styled.h3`
  margin-top: -1rem;
`;

const DayMonthNumber = styled.h4`
  font-weight: normal;
  margin: 0.2rem 0;
`;

const Description = styled.div`
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const HiLowTemperatures = styled.div`
  font-size: 0.6rem;
`;

const WeekdayName = styled.h3`
  margin: 0.3rem 0;
`;

const buildIconURL =
  (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default ({ data: { dt, temp: { day, min, max }, weather }}) => {
  const description = get(weather, [0, 'description']);
  const iconCode = get(weather, [0, 'icon']);
  const iconURL = buildIconURL(iconCode);
  const forecastDate = new Date(dt * 1000);
  const weekdayName = weekdayNames[forecastDate.getDay()];
  const monthName = monthNames[forecastDate.getMonth()];
  const monthDay = `${monthName} ${forecastDate.getDate()}`;
  const dayTemp = Math.round(day);
  const hiTemp = Math.round(max);
  const lowTemp = Math.round(min);

  return (
    <div>
      <WeekdayName>{weekdayName}</WeekdayName>
      <DayMonthNumber>{monthDay}</DayMonthNumber>
      <Description>{description}</Description>
      <img alt='Weather icon' src={iconURL} />
      <DayTemperature>{dayTemp}&deg;C</DayTemperature>
      <HiLowTemperatures>hi:{hiTemp} / lo:{lowTemp}</HiLowTemperatures>
    </div>
  );
};
