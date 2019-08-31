import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import DomainCard from './components/cards/domains'
import GithubCard from './components/cards/github-repository'
import NpmCard from './components/cards/npm'
import PypiCard from './components/cards/pypi'
import RubyGemsCard from './components/cards/rubygems'
import CratesioCard from './components/cards/cratesio'
import HomebrewCard from './components/cards/homebrew'
import LinuxCard from './components/cards/linux'
import TwitterCard from './components/cards/twitter'
import SpectrumCard from './components/cards/spectrum'
import SlackCard from './components/cards/slack'
import S3Card from './components/cards/s3'
import JsOrgCard from './components/cards/jsorg'
import GithubSearchCard from './components/cards/github-search'
import AppStoreCard from './components/cards/appstore'
import HerokuCard from './components/cards/heroku'
import NowCard from './components/cards/now'
import NtaCard from './components/cards/nta'

import Welcome from './components/Welcome'
import Footer from './components/Footer'
import Suggestion from './components/Suggestion'

import { useDeferredState } from './util/hooks'
import { mobile } from './util/css'
import { isStandalone } from './util/pwa'

export default function App() {
  const [query, setQuery] = useDeferredState(1000, '')
  const [inputValue, setInputValue] = useState('')
  const [suggested, setSuggested] = useState(false)
  const inputRef = useRef()
  const {
    t,
    i18n: { language },
  } = useTranslation()

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
        <title>namae — {t('title')}</title>
      </Helmet>

      <Header>
        <InputContainer>
          <Logo onClick={onLogoClick}>namæ</Logo>
          <InputView
            onChange={onInputChange}
            value={inputValue}
            ref={inputRef}
            placeholder={t('placeholder')}
            aria-label="search query"
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
              <DomainCard query={query} />
              <GithubCard query={query} />
              <NpmCard query={query} />
              <PypiCard query={query} />
              <RubyGemsCard query={query} />
              <CratesioCard query={query} />
              <HomebrewCard query={query} />
              <LinuxCard query={query} />
              <TwitterCard query={query} />
              <SpectrumCard query={query} />
              <SlackCard query={query} />
              <HerokuCard query={query} />
              <NowCard query={query} />
              <JsOrgCard query={query} />
              <S3Card query={query} />
            </Cards>
            <Cards>
              <GithubSearchCard query={query} />
              <AppStoreCard query={query} />
              {language === 'ja' ? <NtaCard query={query} /> : null}
            </Cards>
          </SearchResult>
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
