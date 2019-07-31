import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { useDeferredState } from './hooks/state'
import { mobile } from './util/css'

import Footer from './components/Footer'

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

        {query && query.length > 0 ? (
          <Cards>
            <CardHeader>Result for {query}</CardHeader>
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
        ) : null}
        <Footer />
      </Content>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
body {
  background: #ffffff;

  ${mobile} {
    background: #f5f5f5;
  }
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
  box-shadow: 0 10px 20px 0 #3c94fa;
  border-radius: 4px;

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
  placeholder: ['awesome-library', 'stunning-package', 'magnificent-app'][
    Math.floor(Math.random() * 3)
  ],
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
})`
  width: 100%;
  outline: none;
  text-align: center;
  font-size: 5rem;
  font-family: monospace;
  border: none;

  ${mobile} {
    font-size: 2rem;
  }
`

const Cards = styled.div`
  margin-top: 40px;
`

const CardHeader = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;

  ${mobile} {
    padding-left: 20px;
    text-align: left;
  }
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  ${mobile} {
    flex-direction: column;
  }
`
