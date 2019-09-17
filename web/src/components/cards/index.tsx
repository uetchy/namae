import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {mobile} from '../../util/css';
import DomainCard from './Domains';
import GithubCard from './GitHubRepository';
import NpmCard from './Npm';
import PypiCard from './PyPI';
import RubyGemsCard from './RubyGems';
import CratesioCard from './Cratesio';
import HomebrewCard from './Homebrew';
import LinuxCard from './Linux';
import TwitterCard from './Twitter';
import SpectrumCard from './Spectrum';
import SlackCard from './Slack';
import S3Card from './S3';
import JsOrgCard from './JsOrg';
import GithubSearchCard from './GitHubSearch';
import AppStoreCard from './AppStore';
import HerokuCard from './Heroku';
import NowCard from './Now';
import NtaCard from './Nta';

const Index: React.FC<{query: string}> = ({query}) => {
  const {
    i18n: {language},
  } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default Index;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  ${mobile} {
    flex-direction: column;
  }
`;
