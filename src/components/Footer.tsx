import React from 'react';
import { OutboundLink } from 'react-ga';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaProductHunt, FaTwitter } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import styled from 'styled-components';
import { Section } from '../theme';
import { tablet } from '../util/css';
import Contributors from '../components/Contributors';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Pane>
        <Title>Language</Title>
        <LangBox>
          <Links>
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
            <a href="/?lng=zh-Hans">
              <span role="img" aria-label="Simplified Chinese">
                🇨🇳
              </span>
            </a>
          </Links>
        </LangBox>
      </Pane>

      <Pane>
        <Title>Community</Title>
        <ul>
          <li>
            <OutboundLink
              to="https://github.com/uetchy/namae"
              eventLabel="GitHub Repo"
              aria-label="Go to GitHub repository"
              target="_blank"
            >
              GitHub
            </OutboundLink>
          </li>
          <li>
            <OutboundLink
              to="https://github.com/uetchy/namae/issues"
              eventLabel="GitHub Issues"
              aria-label="Go to GitHub Issues"
              target="_blank"
            >
              Issues
            </OutboundLink>
          </li>
          <li>
            <OutboundLink
              to="https://dev.to/uetchy/give-your-app-slick-name-with-namae-dev-5c4h"
              eventLabel="Blog article"
              aria-label="Go to blog"
              target="_blank"
            >
              Blog Article
            </OutboundLink>
          </li>
        </ul>
        <Box>
          <Subtitle>Contributors</Subtitle>
          <Contributors />
        </Box>
      </Pane>

      <Pane>
        <Title>About</Title>
        <p>
          Made with{'  '}
          <span role="img" aria-label="coffee">
            ☕️
          </span>{' '}
          by{' '}
          <OutboundLink
            to="https://twitter.com/uechz"
            eventLabel="Author Page"
            aria-label="Author page"
            target="_blank"
          >
            <Bold>Yasuaki Uechi</Bold>
          </OutboundLink>
        </p>
        <ShareBox>
          <Links>
            <OutboundLink
              to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `namae — ${t('title')}`,
              )}&url=${encodeURIComponent('https://namae.dev')}`}
              eventLabel="Tweet"
              aria-label="Tweet this page"
              target="_blank"
            >
              <FaTwitter />
            </OutboundLink>
            <OutboundLink
              to="https://www.producthunt.com/posts/namae"
              eventLabel="ProductHunt"
              aria-label="Go to ProductHunt page"
              target="_blank"
            >
              <FaProductHunt />
            </OutboundLink>
            <OutboundLink
              to="https://github.com/uetchy/namae"
              eventLabel="GitHub Repo"
              aria-label="Go to GitHub repository"
              target="_blank"
            >
              <FaGithub />
            </OutboundLink>
            <OutboundLink
              to="https://github.com/sponsors/uetchy"
              eventLabel="GitHub Sponsors"
              aria-label="Go to GitHub Sponsors"
              target="_blank"
            >
              <SponsorBadge>
                <GoHeart size="1.3rem" />
                <span>Sponsor</span>
              </SponsorBadge>
            </OutboundLink>
          </Links>
        </ShareBox>
      </Pane>
    </Container>
  );
};
export default Footer;

const Container = styled(Section)`
  --text: #bdbdbd;
  --background: #404040;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: var(--background);
  color: var(--text);

  a {
    color: var(--text);
    text-decoration: none;
  }

  ul {
    li {
      list-style-type: none;
    }
  }

  ${tablet} {
    flex-direction: column;
  }
`;

const Pane = styled.div`
  font-size: 1rem;

  ${tablet} {
    margin-bottom: 50px;
  }
`;

const Box = styled.div`
  margin: 15px 0;
`;

const Title = styled.h3`
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  margin-bottom: 12px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 10px;
  }
`;

const LangBox = styled.div`
  line-height: 1em;
  font-size: 2rem;

  ${Links} {
    a {
      margin-right: 5px;
    }
  }
`;

const ShareBox = styled.div`
  margin-top: 15px;
  line-height: 1em;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;
const Bold = styled.span`
  font-weight: bold;
`;

const SponsorBadge = styled.div`
  padding: 5px 13px 5px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1rem;
  font-size: 1rem;

  border-radius: 5px;
  background-color: #f8f9fa;
  color: black;
  cursor: pointer;

  transition: opacity 200ms ease-out;

  :hover {
    opacity: 0.8;
  }

  svg {
    color: rgb(236, 69, 171);
    margin-right: 5px;
  }
`;
