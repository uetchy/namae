import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { FullScreenSuspense } from './util/suspense'
import './util/i18n'

const Container = () => (
  <FullScreenSuspense>
    <App />
  </FullScreenSuspense>
)

ReactDOM.render(<Container />, document.getElementById('root'))

// register Google Analytics
if (process.env.NODE_ENV !== 'development') {
  import('react-ga').then((ReactGA) => {
    ReactGA.initialize('UA-28919359-15')
    ReactGA.pageview(window.location.pathname + window.location.search)
  })
}

serviceWorker.register({})
