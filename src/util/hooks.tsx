import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

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

export function useOpenSearch(xmlPath: string) {
  return () => (
    <Helmet>
      <link
        rel="search"
        type="application/opensearchdescription+xml"
        title="namae"
        href={xmlPath}
      />
    </Helmet>
  );
}
