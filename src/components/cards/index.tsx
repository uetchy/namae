import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { mobile } from '../../util/css';
import AppStoreCard from './providers/AppStore';
import ChromeWebStoreCard from './providers/ChromeWebStore';
import CloudflareCard from './providers/Cloudflare';
import CratesioCard from './providers/Cratesio';
import DomainCard from './providers/Domains';
import FirebaseCard from './providers/Firebase';
import FirefoxAddonsCard from './providers/FirefoxAddons';
import FlyIoCard from './providers/FlyIo';
import GithubCard from './providers/GitHubOrganization';
import GithubSearchCard from './providers/GitHubSearch';
import GitLabCard from './providers/GitLab';
import HerokuCard from './providers/Heroku';
import HexPmCard from './providers/HexPm';
import HomebrewCard from './providers/Homebrew';
import JsOrgCard from './providers/JsOrg';
import LinuxCard from './providers/Linux';
import ModLandCard from './providers/ModLand';
import NetlifyCard from './providers/Netlify';
import NpmCard from './providers/Npm';
import NtaCard from './providers/Nta';
import OcamlCard from './providers/Ocaml';
import PlayStoreCard from './providers/PlayStore';
import ProductHuntCard from './providers/ProductHunt';
import PypiCard from './providers/PyPI';
import RubyGemsCard from './providers/RubyGems';
import S3Card from './providers/S3';
import SlackCard from './providers/Slack';
import SubredditCard from './providers/Subreddit';
import TwitterCard from './providers/Twitter';
import VercelCard from './providers/Vercel';
import YouTubeCard from './providers/YouTube';
// import InstagramCard from './providers/Instagram';

const Index: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        {/* <Title>{t('section.starter')}</Title> */}
        <Cards>
          <DomainCard query={query} />
          <GithubCard query={query} />
          <GitLabCard query={query} />
          <SlackCard query={query} />
          <ProductHuntCard query={query} />
          <GithubSearchCard query={query} />
          <NtaCard query={query} />
        </Cards>
      </Section>
      <Section>
        <Title>{t('section.social')}</Title>
        <Cards>
          <TwitterCard query={query} />
          <SubredditCard query={query} />
          <YouTubeCard query={query} />
          {/* <InstagramCard query={query} /> */}
        </Cards>
      </Section>
      <Section>
        <Title>{t('section.package')}</Title>
        <Cards>
          <HomebrewCard query={query} />
          <LinuxCard query={query} />
          <NpmCard query={query} />
          <PypiCard query={query} />
          <CratesioCard query={query} />
          <RubyGemsCard query={query} />
          <HexPmCard query={query} />
          <OcamlCard query={query} />
        </Cards>
      </Section>
      <Section>
        <Title>{t('section.web')}</Title>
        <Cards>
          <FlyIoCard query={query} />
          <VercelCard query={query} />
          <HerokuCard query={query} />
          <NetlifyCard query={query} />
          <CloudflareCard query={query} />
          <S3Card query={query} />
          <FirebaseCard query={query} />
          <JsOrgCard query={query} />
          <ModLandCard query={query} />
        </Cards>
      </Section>
      <Section>
        <Title>{t('section.app')}</Title>
        <Cards>
          <AppStoreCard query={query} />
          <PlayStoreCard query={query} />
          <FirefoxAddonsCard query={query} />
          <ChromeWebStoreCard query={query} />
        </Cards>
      </Section>
    </>
  );
};

export default Index;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 40px;
`;

const Title = styled.h1`
  margin: 20px 0 10px;
  text-align: center;
  font-size: 3rem;

  ${mobile} {
    margin: 0;
    text-align: left;
    font-size: 2rem;
    padding: 0 20px;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;

  ${mobile} {
    flex-direction: column;
    margin-top: 40px;
  }
`;
