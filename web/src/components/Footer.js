import React from 'react'
import styled from 'styled-components'
import { FaTwitter, FaGithubAlt } from 'react-icons/fa'

import { ExternalLink } from './Links'

export default function Footer() {
  return (
    <Container>
      <p>
        Made with{'  '}
        <span role="img" aria-label="coffee">
          🦀
        </span>
        by{' '}
        <ExternalLink href="https://uechi.io">
          <Bold>Yasuaki Uechi</Bold>
        </ExternalLink>
      </p>
      <Links>
        <ExternalLink href="https://github.com/uetchy/namae">
          <FaGithubAlt />
        </ExternalLink>
        <ExternalLink href="https://twitter.com/uetschy">
          <FaTwitter />
        </ExternalLink>
      </Links>
    </Container>
  )
}

const Container = styled.footer`
  margin: 40px 0;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 0.7rem;
  display: flex;
  align-items: stretch;
  justify-content: center;

  ${ExternalLink} {
    color: black;
    text-decoration: none;
  }
`

const Links = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: flex-end;

  ${ExternalLink} {
    margin-right: 5px;
  }
`

const Bold = styled.span`
  font-weight: bold;
`
