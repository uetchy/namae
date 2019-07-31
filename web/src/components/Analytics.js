import { useEffect } from 'react'
import ReactGA from 'react-ga'

export function EventReporter({ query }) {
  useEffect(() => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Send a request',
    })
  }, [query])

  return null
}
