import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {FaTwitter, FaGithub, FaProductHunt} from 'react-icons/fa';

import {ExternalLink} from './Links';

const Footer: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <LangBox>
        <a href="/?lng=en">
          <span role="img" aria-label="English">
            🇬🇧
          </span>
        </a>
        <a href="/?lng=ja">
          <span role="img" aria-label="Japanese">
            🇯🇵
          </span>
        </a>
      </LangBox>

      <Box>
        <p>
          Made with{'  '}
          <span role="img" aria-label="coffee">
            ☕️
          </span>{' '}
          by{' '}
          <ExternalLink href="https://twitter.com/uetschy">
            <Bold>Yasuaki Uechi</Bold>
          </ExternalLink>
        </p>
      </Box>

      <ShareBox>
        <Links>
          <ExternalLink
            aria-label="Tweet this page"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `namae — ${t('title')}`,
            )}&url=${encodeURIComponent('https://namae.dev')}`}>
            <FaTwitter />
          </ExternalLink>
          <ExternalLink
            href="https://www.producthunt.com/posts/namae"
            aria-label="Go to ProductHunt page">
            <FaProductHunt />
          </ExternalLink>
          <ExternalLink
            href="https://github.com/uetchy/namae"
            aria-label="Go to GitHub repository">
            <FaGithub />
          </ExternalLink>
        </Links>
      </ShareBox>
    </Container>
  );
};
export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  a {
    color: black;
    text-decoration: none;
  }
`;

const Box = styled.footer`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 1em;
  font-size: 0.8rem;
`;

const LangBox = styled(Box)`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ShareBox = styled(Box)`
  font-size: 1.5rem;
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  ${ExternalLink} {
    margin-right: 5px;
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;
