import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import { GlobalStyle } from './theme'
import { useOpenSearch } from './util/hooks'
import { isStandalone } from './util/pwa'

export default function App() {
  const OpenSearch = useOpenSearch('/opensearch.xml')

  return (
    <>
      <GlobalStyle />
      <OpenSearch />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/s/:query">
          <Search />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>

      {!isStandalone() && <Footer />}
    </>
  )
}
