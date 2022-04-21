import React from 'react';
import { useTranslation } from 'react-i18next';
import { DiHeroku } from 'react-icons/di';
import {
  FaAws,
  FaGithub,
  FaGithubAlt,
  FaGitlab,
  // FaInstagram,
  FaJsSquare,
  FaPython,
  FaReddit,
  FaSlack,
  FaTwitter,
  FaCloudflare,
  FaFirefoxBrowser,
  FaYoutube,
} from 'react-icons/fa';
import { IoIosBeer, IoMdAppstore } from 'react-icons/io';
import { MdDomain } from 'react-icons/md';
import { RiBuilding2Fill, RiChromeFill, RiNpmjsFill } from 'react-icons/ri';
import { SiDeno } from 'react-icons/si';
import {
  SiAppstore,
  SiArchlinux,
  SiDebian,
  SiFirebase,
  SiRubygems,
  SiRust,
  SiUbuntu,
} from 'react-icons/si';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { sendGettingStartedEvent } from '../util/analytics';
import { mobile } from '../util/css';
import { NetlifyIcon, NowIcon, OcamlIcon } from './Icons';

const supportedProviders: Record<string, React.ReactNode> = {
  domains: <MdDomain />,
  github: <FaGithub />,
  gitlab: <FaGitlab />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
  homebrew: <IoIosBeer />,
  npm: <RiNpmjsFill />,
  rust: <SiRust />,
  pypi: <FaPython />,
  rubygems: <SiRubygems />,
  ocaml: <OcamlIcon />,
  archlinux: <SiArchlinux />,
  ubuntu: <SiUbuntu />,
  debian: <SiDebian />,
  reddit: <FaReddit />,
  // instagram: <FaInstagram />,
  slack: <FaSlack />,
  heroku: <DiHeroku />,
  now: <NowIcon />,
  netlify: <NetlifyIcon />,
  cloudflare: <FaCloudflare />,
  s3: <FaAws />,
  firebase: <SiFirebase />,
  jsorg: <FaJsSquare />,
  modland: <SiDeno />,
  githubSearch: <FaGithubAlt />,
  appStore: <SiAppstore />,
  playStore: <IoMdAppstore />,
  firefoxAddons: <FaFirefoxBrowser />,
  chromeWebStore: <RiChromeFill />,
  nta: <RiBuilding2Fill />,
};

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Section>
        <HeroTitle>{t('title')}</HeroTitle>
        <HeroText>{t('description')}</HeroText>
        <ButtonContainer>
          <List>
            <ListButton>
              <Link to="/s/namae" onClick={() => sendGettingStartedEvent()}>
                {t('gettingStartedWithExample')}
              </Link>
            </ListButton>
            <Subtle>or</Subtle>
            <HList>
              <Link to="/s/SpaceX">SpaceX</Link>
              <Link to="/s/Netflix">Netflix</Link>
              <Link to="/s/Zoom">Zoom</Link>
            </HList>
          </List>
        </ButtonContainer>
      </Section>
      <HighlightSection>
        {Object.keys(supportedProviders).map((key) => (
          <ListItem key={key}>
            {supportedProviders[key]} {t(`providers.${key}`)}
          </ListItem>
        ))}
      </HighlightSection>
      {/* <Section>
        <Title>Integrations</Title>
        <blockquote>Soon</blockquote>
      </Section> */}
    </Container>
  );
};

export default Welcome;

const Subtle = styled.span`
  color: #5a5a5a;
`;

const Container = styled.div`
  /* padding-bottom: 40px; */
  text-align: center;
  font-size: 1.5rem;

  ${mobile} {
    margin-top: 0px;
    text-align: left;
    font-size: 1.1rem;
  }
`;

const Section = styled.div`
  padding: 40px 20vw 100px;

  ${mobile} {
    padding: 0px 40px 50px;
  }
`;

const HighlightSection = styled.div`
  padding: 100px 20vw;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  ${mobile} {
    flex-direction: column;
    padding: 40px 40px 60px;
  }

  color: white;
  /* background-image: linear-gradient(180deg, #a57bf3 0%, #4364e1 100%); */
  background: #632bec;
`;

const Title = styled.h1`
  line-height: 1.6em;
  font-size: 5rem;
  font-weight: 700;

  ${mobile} {
    font-size: 2.5em;
  }
`;

const HeroTitle = styled(Title)`
  padding-bottom: 30px;
  line-height: 1em;
`;

const HeroText = styled.p`
  font-size: 1.2em;
  font-weight: 400;
  line-height: 1.3em;
  color: #3c3c3c;
`;

const ButtonContainer = styled.div`
  margin: 30px 0 0 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
`;

const HList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  a {
    color: black;
    border-bottom: 1px dashed black;
    text-decoration: none;
    font-family: monospace;
  }

  > *:not(:last-child) {
    margin-right: 15px;
  }
`;

const ListItem = styled.div`
  margin: 20px 25px;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  line-height: 1em;

  ${mobile} {
    margin: 10px 0;
    font-size: 1.2rem;
  }

  svg {
    margin-right: 5px;
  }
`;

const ListButton = styled.div`
  margin: 10px 5px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1em;

  ${mobile} {
    margin: 10px 10px 0 0;
  }

  a {
    color: #632bec;
    padding: 12px 25px;
    border: 2px solid #632bec;
    font-family: monospace;
    border-radius: 2px;
    text-decoration: none;

    &:hover {
      color: white;
      background: black;
    }
  }
`;
