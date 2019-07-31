import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

ReactGA.initialize('UA-28919359-15')
ReactGA.pageview(window.location.pathname + window.location.search)

serviceWorker.unregister()
