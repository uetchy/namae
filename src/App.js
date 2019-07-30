import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useDeferredState } from './hooks/state'
import { CardHolder } from './components/Card'
import GithubCard from './components/GithubCard'
import TwitterCard from './components/TwitterCard'
import NpmCard from './components/NpmCard'
import JsOrgCard from './components/JsOrgCard'
import HomebrewCard from './components/HomebrewCard'
import './App.css'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

export default function App() {
  const [query, setQuery] = useDeferredState(1000)

  function onChange(e) {
    setQuery(e.target.value)
  }

  return (
    <>
      <GlobalStyle />
      <header>
        <Logo>namae.dev — name your new project</Logo>
        <Input
          onChange={onChange}
          placeholder="awesome-package"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </header>
      {query && query.length > 0 ? (
        <Result>
          <ResultHeader>Result for {query}</ResultHeader>
          <CardHolder>
            <GithubCard name={query} />
            <TwitterCard name={query} />
            <NpmCard name={query} />
            <JsOrgCard name={query} />
            <HomebrewCard name={query} />
          </CardHolder>
        </Result>
      ) : null}
    </>
  )
}

const Logo = styled.div`
  margin: 15px;
  text-align: center;
`

const Input = styled.input`
  width: 100%;
  padding: 20px;
  outline: none;
  font-size: 4rem;
  font-family: monospace;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }
`

const Result = styled.div`
  margin-top: 40px;
`

const ResultHeader = styled.div`
  padding-left: 20px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`
