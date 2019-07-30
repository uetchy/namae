import React, { Suspense } from 'react'
import styled from 'styled-components'
import { BarLoader } from 'react-spinners'

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

export function Card({ children }) {
  return (
    <CardWrapper>
      <ErrorBoundary>
        <Suspense fallback={<BarLoader />}>{children}</Suspense>
      </ErrorBoundary>
    </CardWrapper>
  )
}

export const CardHolder = styled.div`
  display: flex;
  flex-direction: column;
`

export const CardWrapper = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
`

const ItemContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 8px;
  word-break: break-all;
`

const Item = styled.span`
  margin-left: 6px;
  font-family: monospace;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`

export function AvailabilityCell({ name, availability, url, prefix, icon }) {
  return (
    <ItemContainer>
      {icon}
      <Item>
        <a href={url + name} target="_blank" rel="noopener noreferrer">
          {prefix}
          {availability ? (
            <span style={{ color: 'green' }}>{name}</span>
          ) : (
            <span style={{ color: 'red' }}>{name}</span>
          )}
        </a>
      </Item>
    </ItemContainer>
  )
}
