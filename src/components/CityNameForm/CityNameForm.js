import React from "react";
import { useInput } from '../../hooks/useInputHook';
import styled from 'styled-components';

const CityNameInput = styled.input`
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-align: center;
`;

export default ({ cityName, onChangeCityName }) => {
  const { value, bind, reset } = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onChangeCityName) {
      onChangeCityName(value);
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <CityNameInput
        autoFocus
        type='text'
        placeholder='Enter city name'
        {...bind}
      />
    </form>
  );
}
