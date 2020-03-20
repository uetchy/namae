import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {mobile} from '../../util/css';

import DomainCard from './providers/Domains';
import GithubCard from './providers/GitHubRepository';
import GitLabCard from './providers/GitLab';
import NpmCard from './providers/Npm';
import PypiCard from './providers/PyPI';
import RubyGemsCard from './providers/RubyGems';
import CratesioCard from './providers/Cratesio';
import HomebrewCard from './providers/Homebrew';
import LinuxCard from './providers/Linux';
import InstagramCard from './providers/Instagram';
import TwitterCard from './providers/Twitter';
import SpectrumCard from './providers/Spectrum';
import SlackCard from './providers/Slack';
import S3Card from './providers/S3';
import JsOrgCard from './providers/JsOrg';
import GithubSearchCard from './providers/GitHubSearch';
import AppStoreCard from './providers/AppStore';
import HerokuCard from './providers/Heroku';
import NowCard from './providers/Now';
import NtaCard from './providers/Nta';
import NetlifyCard from './providers/Netlify';
import OcamlCard from './providers/Ocaml';

const Index: React.FC<{query: string}> = ({query}) => {
  const {
    i18n: {language},
  } = useTranslation();

  return (
    <>
      <Cards>
        <DomainCard query={query} />
        <GithubCard query={query} />
        <GitLabCard query={query} />
        <NpmCard query={query} />
        <PypiCard query={query} />
        <CratesioCard query={query} />
        <RubyGemsCard query={query} />
        <OcamlCard query={query} />
        <HomebrewCard query={query} />
        <LinuxCard query={query} />
        <InstagramCard query={query} />
        <TwitterCard query={query} />
        <SpectrumCard query={query} />
        <SlackCard query={query} />
        <HerokuCard query={query} />
        <NowCard query={query} />
        <NetlifyCard query={query} />
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
