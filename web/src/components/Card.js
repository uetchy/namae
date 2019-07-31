import React, { Suspense, useState } from 'react'
import styled from 'styled-components'

import { Fallback } from './Availability'
import { mobile } from '../util/css'

export function Card({ title, nameList, alternativeList = [], children }) {
  const [show, setShow] = useState(false)

  function onClick() {
    setShow(true)
  }

  return (
    <CardWrapper>
      <CardTitle>{title}</CardTitle>
      <>
        {nameList.map((name) => (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>{children(name)}</Suspense>
          </ErrorBoundary>
        ))}
        {show
          ? alternativeList.map((name) => (
              <ErrorBoundary>
                <Suspense fallback={<Fallback />}>{children(name)}</Suspense>
              </ErrorBoundary>
            ))
          : null}
      </>
      {alternativeList.length > 0 && !show ? (
        <ShowAlternativesButton onClick={onClick}>
          show alternatives
        </ShowAlternativesButton>
      ) : null}
    </CardWrapper>
  )
}

export const CardTitle = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 15px;
`

const CardWrapper = styled.div`
  margin-bottom: 20px;
  padding: 40px;
  border-radius: 2px;

  ${mobile} {
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }
  componentDidCatch(error, info) {}
  render() {
    if (this.state.hasError) {
      return <h4>{this.state.message}</h4>
    }
    return this.props.children
  }
}
