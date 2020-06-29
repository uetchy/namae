import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { mobile } from '../../util/css';
import AppStoreCard from './providers/AppStore';
import CratesioCard from './providers/Cratesio';
import DomainCard from './providers/Domains';
import FirebaseCard from './providers/Firebase';
import GithubCard from './providers/GitHubRepository';
import GithubSearchCard from './providers/GitHubSearch';
import GitLabCard from './providers/GitLab';
import HerokuCard from './providers/Heroku';
import HomebrewCard from './providers/Homebrew';
import InstagramCard from './providers/Instagram';
import JsOrgCard from './providers/JsOrg';
import LinuxCard from './providers/Linux';
import NetlifyCard from './providers/Netlify';
import NpmCard from './providers/Npm';
import NtaCard from './providers/Nta';
import OcamlCard from './providers/Ocaml';
import PypiCard from './providers/PyPI';
import RubyGemsCard from './providers/RubyGems';
import S3Card from './providers/S3';
import SlackCard from './providers/Slack';
import SpectrumCard from './providers/Spectrum';
import TwitterCard from './providers/Twitter';
import VercelCard from './providers/Vercel';

const Index: React.FC<{ query: string }> = ({ query }) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <>
      <Cards>
        <DomainCard query={query} />
        <GithubCard query={query} />
        <TwitterCard query={query} />
        <NpmCard query={query} />
        <HomebrewCard query={query} />
        <GitLabCard query={query} />
        <PypiCard query={query} />
        <CratesioCard query={query} />
        <RubyGemsCard query={query} />
        <LinuxCard query={query} />
        <OcamlCard query={query} />
        <VercelCard query={query} />
        <HerokuCard query={query} />
        <NetlifyCard query={query} />
        <JsOrgCard query={query} />
        <SlackCard query={query} />
        <InstagramCard query={query} />
        <SpectrumCard query={query} />
        <S3Card query={query} />
        <FirebaseCard query={query} />
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
