import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useDeferredState } from './hooks/state'
import { CardHolder } from './components/Card'
import GithubCard from './components/GithubCard'
import TwitterCard from './components/TwitterCard'
import NpmCard from './components/NpmCard'
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
        <SearchResult>
          <ResultHeader>Result for {query}</ResultHeader>
          <CardHolder>
            <GithubCard name={query} />
            <TwitterCard name={query} />
            <NpmCard name={query} />
          </CardHolder>
        </SearchResult>
      ) : null}
    </>
  )
}

const Input = styled.input`
  width: 100%;
  padding: 20px;
  outline: none;
  font-size: 4rem;
  font-family: monospace;

  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }
`

const SearchResult = styled.div`
  margin-top: 40px;
`

const ResultHeader = styled.h4`
  padding-left: 20px;
  margin-bottom: 20px;
`
