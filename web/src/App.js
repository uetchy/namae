import React from 'react'
import styled from 'styled-components'

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
      <Header>
        <Logo>namæ</Logo>
        <SubHeader>name your new project</SubHeader>
        <Input onChange={onChange} />
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
    </>
  )
}

const Header = styled.header`
  margin-top: 30px;
  text-align: center;
`

const Logo = styled.div`
  margin-bottom: 5px;
  font-family: sans-serif;
  font-weight: bold;
`

const SubHeader = styled.div`
  font-size: 0.8em;
  font-style: italic;
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'awesome-package',
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
})`
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  outline: none;
  text-align: center;
  font-size: 4rem;
  font-family: monospace;
  border: none;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

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
