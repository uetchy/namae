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

import { mobile } from '../util/css'

export default function Welcome() {
  return (
    <Container>
      <Header>name your brand new project</Header>
      <p>
        namæ helps you by searching around package registries and domains to see
        if your desired name is already taken.
      </p>
      <ul>
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
            <IoIosBeer /> Homebrew
          </ListItem>
          <ListItem>
            <DiRust /> crates.io (Rust)
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
      </ul>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
  padding: 0 40px;
  font-size: 1.5rem;
  line-height: 1.6em;

  ${mobile} {
    text-align: left;
  }
`

const Header = styled.h1`
  font-size: 2em;
  padding: 10px 0 40px;
`

const List = styled.div`
  margin-top: 40px;
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
  line-height: 1rem;

  ${mobile} {
    margin: 10px 0;
  }

  svg {
    margin-right: 5px;
  }
`
