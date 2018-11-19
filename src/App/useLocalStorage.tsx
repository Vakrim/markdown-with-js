import { useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, ((setState: ((prevState: T) => T) | T) => void)] {
  const [item, setValue] = useState<T>(() => {
    const valueFromStorage = window.localStorage.getItem(key);

    return valueFromStorage
      ? (JSON.parse(valueFromStorage) as T)
      : initialValue;
  });

  const setItem = (setState: ((prevState: T) => T) | T) => {
    setValue(prevState => {
      const newState =
        setState instanceof Function ? setState(prevState) : setState;
      window.localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    });
  };

  return [item, setItem];
}
