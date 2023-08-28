import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Get the initial value from local storage or use the provided initial value
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Create a state variable to hold the current value
  const [value, setValue] = useState(initial);

  // Define a function to update the value in local storage and the state
  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return {value, updateValue};
}