import React from 'react'
import styled from 'styled-components'
import { FaTwitter, FaGlobe } from 'react-icons/fa'

export default function Footer() {
  return (
    <Container>
      <p>
        Made by U with{' '}
        <span role="img" aria-label="love">
          🐤
        </span>
        <br />
        <br />
        <a
          href="https://twitter.com/uetschy"
          target="_blank"
          rel="noopener noreferrer">
          <FaTwitter />
        </a>{' '}
        <a href="https://uechi.io" target="_blank" rel="noopener noreferrer">
          <FaGlobe />
        </a>
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
