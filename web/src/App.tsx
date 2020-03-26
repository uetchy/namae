import React from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {Helmet} from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {Switch, Route, useParams, Redirect} from 'react-router-dom';
import {IoIosRocket, IoIosFlash} from 'react-icons/io';

import Welcome from './components/Welcome';
import Form from './components/Form';
import Cards from './components/cards';
import Footer from './components/Footer';
import {
  ResultItem,
  ResultIcon,
  ResultName,
  COLORS as ResultColor,
  AvailableIcon,
} from './components/cards/core';
import {mobile} from './util/css';
import {isStandalone} from './util/pwa';
import {sanitize} from './util/text';
import {useStoreState} from './store';

export default function App() {
  return (
    <>
      <GlobalStyle />
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
  );
}

function Home() {
  const {t} = useTranslation();

  return (
    <>
      <Helmet>
        <title>namae — {t('title')}</title>
      </Helmet>
      <Header>
        <Form />
      </Header>
      <Content>
        <Welcome />
      </Content>
    </>
  );
}

function Search() {
  const {query} = useParams<{query: string}>();
  const currentQuery = sanitize(query);
  const {t} = useTranslation();

  return (
    <>
      <Helmet>
        <title>Search for &quot;{currentQuery}&quot; — namae</title>
      </Helmet>
      <Header>
        <Form initialValue={currentQuery} />
      </Header>
      <Content>
        <Legend>
          <Stat />
          <ResultItem color={ResultColor.available}>
            <ResultIcon>
              <IoIosRocket />
            </ResultIcon>
            <ResultName>{t('available')}</ResultName>
            <AvailableIcon>
              <IoIosFlash />
            </AvailableIcon>
          </ResultItem>
          <ResultItem color={ResultColor.unavailable}>
            <ResultIcon>
              <IoIosRocket />
            </ResultIcon>
            <ResultName>{t('unavailable')}</ResultName>
          </ResultItem>
        </Legend>
        <Cards query={currentQuery} />
      </Content>
    </>
  );
}

function Stat() {
  const totalCount = useStoreState((state) => state.stats.totalCount);
  const availableCount = useStoreState((state) => state.stats.availableCount);
  const {t} = useTranslation();

  const uniqueness = ((n) => {
    if (n > 0.7 && n <= 1.0) {
      return t('uniqueness.high');
    } else if (n > 0.4 && n <= 0.7) {
      return t('uniqueness.moderate');
    } else {
      return t('uniqueness.low');
    }
  })(availableCount / totalCount);

  return <UniquenessIndicator>{uniqueness}</UniquenessIndicator>;
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  line-height: 1.625em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;

  ${mobile} {
    background: #f5f5f5;
  }
}
`;

const Content = styled.div`
  padding-top: 100px;

  ${mobile} {
    padding-top: 60px;
  }
`;

const Header = styled.header`
  padding: 0 40px;
  background-image: linear-gradient(180deg, #bda2ff 0%, #1b24cc 99%);

  ${mobile} {
    padding: 0 20px;
  }
`;

const Legend = styled.div`
  margin-top: -100px;
  padding: 100px 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  user-select: none;
  cursor: default;
  background-color: #f6f6fa;

  ${mobile} {
    flex-direction: column;
    align-items: center;
    margin-top: -80px;
    padding: 70px 0 30px;
    background-color: none;
  }

  > * {
    margin: 0 10px 0;
  }
`;

const UniquenessIndicator = styled.div`
  color: #7b7b7b;
`;
