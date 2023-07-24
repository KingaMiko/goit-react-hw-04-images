import { useState } from 'react';

export const useSearch = () => {
  const [inputValue, setInputValue] = useState('nature');

  const handleInputChange = newInputValue => {
    setInputValue(newInputValue);
  };

  return { inputValue, handleInputChange };
};
