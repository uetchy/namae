import React from 'react'
import styled from 'styled-components'

import { FaMapSigns } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaNpm } from 'react-icons/fa'
import { FaPython } from 'react-icons/fa'
import { IoIosBeer } from 'react-icons/io'
import { DiRust } from 'react-icons/di'
import { FaJsSquare } from 'react-icons/fa'
import { FaAws } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaSlack } from 'react-icons/fa'
import { FaGem } from 'react-icons/fa'

import { mobile } from '../util/css'

export default function Welcome() {
  return (
    <Container>
      <Hero>
        <Header>name new project</Header>
        <Text>
          namæ saves your time searching around registries and checking if the
          desired name is ready for use.
        </Text>
      </Hero>
      <List>
        <ListItem>
          <FaMapSigns /> Domains
        </ListItem>
        <ListItem>
          <FaGithub /> GitHub Organization
        </ListItem>
        <ListItem>
          <FaNpm /> npm
        </ListItem>
        <ListItem>
          <FaPython /> PyPI
        </ListItem>
        <ListItem>
          <FaGem /> RubyGems
        </ListItem>
        <ListItem>
          <DiRust /> Rust
        </ListItem>
        <ListItem>
          <IoIosBeer /> Homebrew
        </ListItem>
        <ListItem>
          <FaJsSquare /> js.org
        </ListItem>
        <ListItem>
          <FaAws /> AWS S3 Bucket
        </ListItem>
        <ListItem>
          <FaTwitter /> Twitter
        </ListItem>
        <ListItem>
          <FaSlack /> Slack
        </ListItem>
      </List>
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 40px;
  padding-right: 20vw;
  padding-left: 20vw;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.6em;

  ${mobile} {
    text-align: left;
    padding-right: 40px;
    padding-left: 40px;
    font-size: 1.2rem;
  }
`

const Header = styled.h1`
  font-size: 3.5em;
  line-height: 0.8em;
  padding-bottom: 30px;
`

const Text = styled.p`
  font-size: 1.2em;
  color: #3c3c3c;
`

const Hero = styled.div``

const List = styled.div`
  margin-top: 50px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-image: linear-gradient(180deg, #ec7951 0%, #f03054 100%);
  color: white;
  border-radius: 4px;
  font-size: 1rem;

  ${mobile} {
    flex-direction: column;
  }
`

const ListItem = styled.div`
  margin: 15px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1em;

  ${mobile} {
    margin: 10px 0;
  }

  svg {
    margin-right: 5px;
  }
`
