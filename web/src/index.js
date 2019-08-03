import React, { Suspense } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import BarLoader from 'react-spinners/BarLoader'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './i18n'

const Fallback = () => (
  <Container>
    <BarLoader />
  </Container>
)

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

ReactDOM.render(
  <Suspense fallback={<Fallback />}>
    <App />
  </Suspense>,
  document.getElementById('root')
)

ReactGA.initialize('UA-28919359-15')
ReactGA.pageview(window.location.pathname + window.location.search)

serviceWorker.register()
