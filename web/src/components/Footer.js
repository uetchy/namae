import React from 'react'
import styled from 'styled-components'
import { FaTwitter, FaGithubAlt } from 'react-icons/fa'

import { ExternalLink } from './Links'

export default function Footer() {
  return (
    <Container>
      <p>
        Made by <Bold>Yasuaki Uechi</Bold> with{'  '}
        <span role="img" aria-label="coffee">
          🦀
        </span>
      </p>
      <Links>
        <ExternalLink href="https://twitter.com/uetschy">
          <FaTwitter />
        </ExternalLink>{' '}
        <ExternalLink href="https://github.com/uetchy/namae">
          <FaGithubAlt />
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
`

const Links = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: flex-end;

  a {
    margin-right: 5px;
    color: black;
  }
`

const Bold = styled.span`
  font-weight: bold;
`
