import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {
  FaMapSigns,
  FaGithub,
  FaGitlab,
  FaNpm,
  FaPython,
  FaGem,
  FaLinux,
  FaAppStore,
  FaTwitter,
  FaSlack,
  FaAws,
  FaJsSquare,
  FaBuilding,
} from 'react-icons/fa';
import {IoIosBeer} from 'react-icons/io';
import {DiRust, DiHeroku} from 'react-icons/di';

import {SpectrumIcon, NowIcon, NetlifyIcon, OcamlIcon} from './Icons';
import {shuffleArray} from '../util/array';
import {mobile} from '../util/css';

const QUERY_WORDS = [
  'Name',
  'Colorful',
  'Ghost',
  'Animate',
  'Graph',
  'Compile',
  'Crop',
  'Test',
  'Cat',
  'Machine',
  'Craft',
];

const Welcome: React.FC = () => {
  const {t} = useTranslation();

  const queries = shuffleArray(QUERY_WORDS).slice(0, 5);

  return (
    <Container>
      <Hero>
        <HeroTitle>{t('title')}</HeroTitle>
        <HeroText>{t('description')}</HeroText>
        <ButtonContainer>
          <h5>{t('exampleQueries')}</h5>
          <List>
            {queries.map((query) => (
              <ListButton key={query}>
                <Link to={`/s/${query}`}>{query}</Link>
              </ListButton>
            ))}
          </List>
        </ButtonContainer>
      </Hero>
      <HighlightedList>
        <ListItem>
          <FaMapSigns /> {t('providers.domains')}
        </ListItem>
        <ListItem>
          <FaGithub /> {t('providers.github')}
        </ListItem>
        <ListItem>
          <FaGitlab /> {t('providers.gitlab')}
        </ListItem>
        <ListItem>
          <FaNpm /> {t('providers.npm')}
        </ListItem>
        <ListItem>
          <DiRust /> {t('providers.rust')}
        </ListItem>
        <ListItem>
          <FaPython /> {t('providers.pypi')}
        </ListItem>
        <ListItem>
          <FaGem /> {t('providers.rubygems')}
        </ListItem>
        <ListItem>
          <OcamlIcon /> {t('providers.ocaml')}
        </ListItem>
        <ListItem>
          <IoIosBeer /> {t('providers.homebrew')}
        </ListItem>
        <ListItem>
          <FaLinux /> {t('providers.linux')}
        </ListItem>
        <ListItem>
          <FaTwitter /> {t('providers.twitter')}
        </ListItem>
        <ListItem>
          <SpectrumIcon /> {t('providers.spectrum')}
        </ListItem>
        <ListItem>
          <FaSlack /> {t('providers.slack')}
        </ListItem>
        <ListItem>
          <DiHeroku /> {t('providers.heroku')}
        </ListItem>
        <ListItem>
          <NowIcon /> {t('providers.now')}
        </ListItem>
        <ListItem>
          <NetlifyIcon /> {t('providers.netlify')}
        </ListItem>
        <ListItem>
          <FaAws /> {t('providers.s3')}
        </ListItem>
        <ListItem>
          <FaJsSquare /> {t('providers.jsorg')}
        </ListItem>
        <ListItem>
          <FaGithub /> {t('providers.githubSearch')}
        </ListItem>
        <ListItem>
          <FaAppStore /> {t('providers.appStore')}
        </ListItem>
        <ListItem>
          <FaBuilding /> {t('providers.nta')}
        </ListItem>
      </HighlightedList>
    </Container>
  );
};
export default Welcome;

const Container = styled.div`
  margin-top: 30px;
  padding-bottom: 40px;
  text-align: center;
  font-size: 1.5rem;

  ${mobile} {
    margin-top: 0px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

const HeroTitle = styled.h1`
  padding-bottom: 30px;
  line-height: 1em;
  font-size: 5rem;
  font-weight: 700;

  ${mobile} {
    font-size: 2.5em;
  }
`;

const HeroText = styled.p`
  font-size: 1.2em;
  font-weight: 300;
  line-height: 1.3em;
  color: #3c3c3c;
`;

const Hero = styled.div`
  margin-right: 20vw;
  margin-left: 20vw;

  ${mobile} {
    margin: inherit;
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const ButtonContainer = styled.div`
  margin: 30px 0 0 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  font-size: 1rem;

  ${mobile} {
    justify-content: flex-start;
  }
`;

const HighlightedList = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  ${mobile} {
    flex-direction: column;
    margin-top: 50px;
    padding: 20px;
  }

  padding: 50px 20vw 50px 20vw;
  color: white;
  /* background-image: linear-gradient(180deg, #a57bf3 0%, #4364e1 100%); */
  background: #632bec;
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
    color: black;
    padding: 10px;
    border: 1px solid black;
    border-radius: 2px;
    text-decoration: none;

    &:hover {
      color: white;
      background: black;
    }
  }
`;
