import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { useDeferredState } from './hooks/state'
import { mobile } from './util/css'

import Welcome from './components/Welcome'
import Footer from './components/Footer'
import { Cards, CardContainer } from './components/Cards'

import GithubCard from './components/cards/GithubCard'
import DomainCard from './components/cards/DomainCard'
import HomebrewCard from './components/cards/HomebrewCard'
import TwitterCard from './components/cards/TwitterCard'
import SlackCard from './components/cards/SlackCard'
import NpmCard from './components/cards/NpmCard'
import JsOrgCard from './components/cards/JsOrgCard'
import PypiCard from './components/cards/PypiCard'
import S3Card from './components/cards/S3Card'
import CratesioCard from './components/cards/CratesioCard'
import { EventReporter } from './components/Analytics'

export default function App() {
  const [query, setQuery] = useDeferredState(1000)

  function onChange(e) {
    setQuery(e.target.value)
  }

  const queryGiven = query && query.length > 0

  return (
    <>
      <GlobalStyle />
      <Content>
        <Header>
          <InputContainer>
            <Logo>namæ</Logo>
            <Input onChange={onChange} />
          </InputContainer>
        </Header>

        {queryGiven ? (
          <Cards>
            <CardContainer>
              <DomainCard name={query} />
              <GithubCard name={query} />
              <HomebrewCard name={query} />
              <NpmCard name={query} />
              <PypiCard name={query} />
              <CratesioCard name={query} />
              <TwitterCard name={query} />
              <SlackCard name={query} />
              <S3Card name={query} />
              <JsOrgCard name={query} />
            </CardContainer>
            <EventReporter query={query} />
          </Cards>
        ) : (
          <Welcome />
        )}
        <Footer />
      </Content>
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
  background: #ffffff;

  ${mobile} {
    background: #f5f5f5;
  }

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

const Content = styled.div``

const Header = styled.header`
  margin-bottom: 100px;
  padding: 0 40px;
  background-image: linear-gradient(180deg, #a2d4ff 0%, #ac57ff 99%);

  ${mobile} {
    margin-bottom: 60px;
    padding: 0 20px;
  }
`

const InputContainer = styled.div`
  transform: translateY(40px);
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 10px 20px 0 #c7dcf7;
  border-radius: 20px;

  ${mobile} {
    transform: translateY(20px);
  }
`

const Logo = styled.div`
  margin-bottom: 5px;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #4a90e2;

  ${mobile} {
    font-size: 15px;
  }
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'search',
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
})`
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  font-family: monospace;
  font-size: 5rem;

  ${mobile} {
    font-size: 1.5rem;
  }
`
