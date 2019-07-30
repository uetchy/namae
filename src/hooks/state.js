import { useState, useEffect } from 'react'

export function useDeferredState(duration) {
  const [response, setResponse] = useState()
  const [innerValue, setInnerValue] = useState()

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
