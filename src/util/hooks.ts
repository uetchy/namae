import { useEffect, useState } from 'react';

export function useDeferredState<T>(
  duration = 1000,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [response, setResponse] = useState(initialValue);
  const [innerValue, setInnerValue] = useState(initialValue);

  useEffect(() => {
    const fn = setTimeout(() => {
      setResponse(innerValue);
    }, duration);

    return (): void => {
      clearTimeout(fn);
    };
  }, [duration, innerValue]);

  return [response, setInnerValue];
}
