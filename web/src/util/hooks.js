import { useState, useEffect } from 'react'

export function useDeferredState(duration = 1000, initialValue = undefined) {
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
