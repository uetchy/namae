import React from 'react'
import styled from 'styled-components'
import { FaTwitter, FaGithubAlt } from 'react-icons/fa'

import { ExternalLink } from './Links'

export default function Footer() {
  return (
    <Container>
      <p>
        Made by U with{' '}
        <span role="img" aria-label="coffee">
          ☕️
        </span>
        <br />
        <br />
        <ExternalLink href="https://twitter.com/uetschy">
          <FaTwitter />
        </ExternalLink>{' '}
        <ExternalLink href="https://github.com/uetchy/namae">
          <FaGithubAlt />
        </ExternalLink>
      </p>
    </Container>
  )
}

const Container = styled.footer`
  margin: 40px 0;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 0.8em;
`
