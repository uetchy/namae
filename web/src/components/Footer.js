import React from 'react'
import styled from 'styled-components'
import { FaTwitter, FaGithubAlt } from 'react-icons/fa'

import { ExternalLink } from './Links'

export default function Footer() {
  return (
    <Contaienr>
      <Box>
        <p>
          Made with{'  '}
          <span role="img" aria-label="coffee">
            🦀
          </span>{' '}
          by{' '}
          <ExternalLink href="https://twitter.com/uetschy">
            <Bold>Yasuaki Uechi</Bold>
          </ExternalLink>
        </p>
        <Links>
          <ExternalLink href="https://github.com/uetchy/namae">
            <FaGithubAlt />
          </ExternalLink>
          <ExternalLink href="https://twitter.com/intent/tweet?text=namae%20%E2%80%94%20name%20new%20project&url=https%3A%2F%2Fnamae.dev">
            <FaTwitter />
          </ExternalLink>
        </Links>
      </Box>

      <Box>
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
      </Box>
    </Contaienr>
  )
}

const Contaienr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 0.7rem;

  a {
    color: black;
    text-decoration: none;
  }
`

const Box = styled.footer`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 1em;
`

const Links = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;

  ${ExternalLink} {
    margin-right: 5px;
  }
`

const Bold = styled.span`
  font-weight: bold;
`
