import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import DomainCard from './components/cards/DomainCard'
import GithubCard from './components/cards/GithubCard'
import NpmCard from './components/cards/NpmCard'
import PypiCard from './components/cards/PypiCard'
import RubyGemsCard from './components/cards/RubyGemsCard'
import CratesioCard from './components/cards/CratesioCard'
import HomebrewCard from './components/cards/HomebrewCard'
import LinuxCard from './components/cards/LinuxCard'
import GithubSearchCard from './components/cards/GithubSearchCard'
import AppStoreCard from './components/cards/AppStoreCard'
import TwitterCard from './components/cards/TwitterCard'
import SlackCard from './components/cards/SlackCard'
import S3Card from './components/cards/S3Card'
import JsOrgCard from './components/cards/JsOrgCard'

import { EventReporter } from './components/Analytics'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import Suggestion from './components/Suggestion'

import { useDeferredState } from './hooks/state'
import { mobile } from './util/css'
import { isStandalone } from './util/pwa'

export default function App() {
  const [query, setQuery] = useDeferredState('', 1000)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()
  const [suggested, setSuggested] = useState(false)
  const { t } = useTranslation()

  const queryGiven = query && query.length > 0

  useEffect(() => {
    const modifiedValue = inputValue.replace(/[\s@+!#$%^&*()[\]]/g, '')
    setQuery(modifiedValue)
  }, [inputValue, setQuery])

  useEffect(() => {
    if (query.length === 0) {
      setSuggested(false)
    }
  }, [query])

  // set input value
  function onInputChange(e) {
    const value = e.target.value
    setInputValue(value)
  }

  // clear input form and focus on it
  function onLogoClick(e) {
    setInputValue('')
    inputRef.current.focus()
  }

  // invoke when user clicked one of the suggested items
  function onSuggestionCompleted(name) {
    setInputValue(name)
    setSuggested(true)
  }

  return (
    <>
      <GlobalStyle />

      <Helmet>
        <title>namaæ — {t('title')}</title>
      </Helmet>

      <Header>
        <InputContainer>
          <Logo onClick={onLogoClick}>namæ</Logo>
          <InputView
            onChange={onInputChange}
            value={inputValue}
            ref={inputRef}
            placeholder={t('placeholder')}
          />
          {queryGiven && !suggested ? (
            <Suggestion onSubmit={onSuggestionCompleted} query={query} />
          ) : null}
        </InputContainer>
      </Header>

      <Content>
        {queryGiven ? (
          <SearchResult>
            <Cards>
              <DomainCard name={query} />
              <GithubCard name={query} />
              <NpmCard name={query} />
              <PypiCard name={query} />
              <RubyGemsCard name={query} />
              <CratesioCard name={query} />
              <HomebrewCard name={query} />
              <LinuxCard name={query} />
              <GithubSearchCard query={query} />
              <AppStoreCard query={query} />
              <TwitterCard name={query} />
              <SlackCard name={query} />
              <S3Card name={query} />
              <JsOrgCard name={query} />
            </Cards>
            <EventReporter query={query} />
          </SearchResult>
        ) : !isStandalone() ? (
          <Welcome />
        ) : null}
        {!isStandalone() ? <Footer /> : null}
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
  cursor: pointer;

  ${mobile} {
    font-size: 15px;
  }
`

const InputView = styled.input.attrs({
  type: 'text',
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
  line-height: 1.2em;

  ${mobile} {
    font-size: 2rem;
  }
`

const SearchResult = styled.div``

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  ${mobile} {
    flex-direction: column;
  }
`
