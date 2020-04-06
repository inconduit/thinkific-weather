import { useState } from 'react';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    reset: () => setValue(''),
    setValue,
    value,
  };
};
