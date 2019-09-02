import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import Welcome from './components/Welcome'
import Form from './components/Form'
import Cards from './components/cards'
import Footer from './components/Footer'

import { mobile } from './util/css'
import { isStandalone } from './util/pwa'

export default function App() {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  function onQuery(query: string) {
    setQuery(query)
  }

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>namae — {t('title')}</title>
      </Helmet>
      <Header>
        <Form onQuery={onQuery} />
      </Header>
      <Content>
        {query !== '' ? (
          <Cards query={query} />
        ) : (
          !isStandalone() && <Welcome />
        )}
      </Content>
      <Footer />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  ${mobile} {
    background: #f5f5f5;
  }
}
`

const Content = styled.div`
  padding-top: 100px;

  ${mobile} {
    padding-top: 60px;
  }
`

const Header = styled.header`
  padding: 0 40px;
  background-image: linear-gradient(180deg, #a2d4ff 0%, #ac57ff 99%);

  ${mobile} {
    padding: 0 20px;
  }
`
