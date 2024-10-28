import { useState, useEffect } from 'react';

function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const storageValue = window.sessionStorage.getItem(key);
    return storageValue? JSON.parse(storageValue) : initialValue;
  });

  useEffect(() => {
      console.log(storedValue)
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
  }, [ storedValue]);

  return [storedValue, setStoredValue];
}

export default useSessionStorage;