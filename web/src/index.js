import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactGA.initialize('UA-28919359-15')
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
