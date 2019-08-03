import { useState, useEffect } from 'react'

export function useDeferredState(initialValue = undefined, duration = 1000) {
  const [response, setResponse] = useState(initialValue)
  const [innerValue, setInnerValue] = useState(initialValue)

  useEffect(() => {
    const fn = setTimeout(() => {
      setResponse(innerValue)
    }, duration)

    return () => {
      clearTimeout(fn)
    }
  }, [duration, innerValue])

  return [response, setInnerValue]
}
