import React, { useState } from 'react'
import styled from 'styled-components'

import { AvailabilityContainer } from './Availability'
import { mobile } from '../util/css'

export function Card({ title, nameList, alternativeList = [], children }) {
  const [revealAlternatives, setRevealAlternatives] = useState(false)

  function onClick() {
    setRevealAlternatives(true)
  }

  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <CardList>
        {nameList.map((name) => (
          <AvailabilityContainer>{children(name)}</AvailabilityContainer>
        ))}
        {revealAlternatives &&
          alternativeList.map((name) => (
            <AvailabilityContainer>{children(name)}</AvailabilityContainer>
          ))}
        {alternativeList.length > 0 && !revealAlternatives ? (
          <ShowAlternativesButton onClick={onClick}>
            show more
          </ShowAlternativesButton>
        ) : null}
      </CardList>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  margin-bottom: 40px;
  padding: 40px;

  ${mobile} {
    padding: 0px;
  }
`

const CardTitle = styled.div`
  margin-bottom: 15px;
  font-size: 0.8rem;
  font-weight: bold;

  ${mobile} {
    padding-left: 20px;
  }
`

const CardList = styled.div`
  border-radius: 2px;

  ${mobile} {
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
    border-radius: 0;
  }
`

const ShowAlternativesButton = styled.div`
  display: inline-block;
  margin-top: 10px;
  padding: 5px 0;
  border: none;
  border-bottom: 1px dashed black;
  cursor: pointer;
  font-family: monospace;
  font-size: 1rem;
`
