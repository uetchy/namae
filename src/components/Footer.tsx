import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FaGithub, FaProductHunt, FaTwitter } from 'react-icons/fa';
import { GoHeart } from 'react-icons/go';
import styled from 'styled-components';
import Contributors from '../components/Contributors';
import { Section } from '../theme';
import { tablet } from '../util/css';

const Footer: React.FC = () => {
  return (
    <Container>
      <Languages />
      <Community />
      <About />
    </Container>
  );
};
export default Footer;

const Languages = () => {
  const { t } = useTranslation();

  return (
    <Pane>
      <Title>{t('language')}</Title>
      <ul>
        <li>
          <a href="/?lng=en">English</a>
        </li>
        <li>
          <a href="/?lng=de">Deutsch</a>
        </li>
        <li>
          <a href="/?lng=fr">Français</a>
        </li>
        <li>
          <a href="/?lng=ja">日本語</a>
        </li>
        <li>
          <a href="/?lng=zh-Hans">简体中文</a>
        </li>
        <li>
          <a href="/?lng=zh-Hant">繁體中文</a>
        </li>
        <li>
          <a href="/?lng=pt-BR">Português-BR</a>
        </li>
      </ul>
    </Pane>
  );
};

const Community = () => {
  const { t } = useTranslation();

  return (
    <Pane>
      <Title>{t('community')}</Title>
      <ul>
        <li>
          <a
            href="https://github.com/uetchy/namae"
            aria-label="Go to GitHub repository"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://github.com/uetchy/namae/issues"
            aria-label="Go to GitHub Issues"
            target="_blank"
            rel="noreferrer"
          >
            {t('issues')}
          </a>
        </li>
        <li>
          <a
            href="https://dev.to/uetchy/give-your-app-slick-name-with-namae-dev-5c4h"
            aria-label="Go to blog"
            target="_blank"
            rel="noreferrer"
          >
            {t('blog')}
          </a>
        </li>
      </ul>
      <Box>
        <Subtitle>{t('contributors')} ✨</Subtitle>
        <Contributors />
        <Subtext>
          <Trans i18nKey="join-us">
            Send
            <a
              href="https://github.com/uetchy/namae"
              target="_blank"
              rel="noopener noreferrer"
            >
              a pull request
            </a>
            and become a contributor!
          </Trans>
        </Subtext>
      </Box>
    </Pane>
  );
};

const About = () => {
  const { t } = useTranslation();
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Pane>
      <Title>{t('about')}</Title>
      <p>
        Made with{'  '}
        <span role="img" aria-label="coffee">
          ☕️
        </span>{' '}
        by{' '}
        <a
          href="https://twitter.com/uechz"
          aria-label="Author page"
          target="_blank"
          rel="noreferrer"
        >
          <Bold>Yasuaki Uechi</Bold>
        </a>
      </p>
      <ShareBox>
        <Links>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `namae — ${t('title')}`
            )}&url=${encodeURIComponent('https://namae.dev')}`}
            aria-label="Tweet this page"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.producthunt.com/posts/namae"
            aria-label="Go to ProductHunt page"
            target="_blank"
            rel="noreferrer"
          >
            <FaProductHunt />
          </a>
          <a
            href="https://github.com/uetchy/namae"
            aria-label="Go to GitHub repository"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://github.com/sponsors/uetchy"
            aria-label="Go to GitHub Sponsors"
            target="_blank"
            rel="noreferrer"
          >
            <SponsorBadge>
              <GoHeart size="1.3em" />
              <span>Sponsor</span>
            </SponsorBadge>
          </a>
        </Links>
      </ShareBox>

      {language === 'ja' ? (
        <>
          <br />
          <Title>情報の取得元</Title>
          <p>
            このサービスは、国税庁法人番号システムのWeb-API機能を利用して取得した情報をもとに作成していますが、サービスの内容は国税庁によって保証されたものではありません。
          </p>
        </>
      ) : null}
    </Pane>
  );
};

const Container = styled(Section)`
  --text: #bdbdbd;
  --background: #150c30;

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

const Subtext = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 10px;
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
