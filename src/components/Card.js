import React, { Suspense } from 'react'
import styled from 'styled-components'
import { BarLoader } from 'react-spinners'

export function Card({ children }) {
  return (
    <CardWrapper>
      <ErrorBoundary>
        <Suspense fallback={<BarLoader />}>{children}</Suspense>
      </ErrorBoundary>
    </CardWrapper>
  )
}

export const CardTitle = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 15px;
`

export const CardHolder = styled.div`
  display: flex;
  flex-direction: column;
`

export function AvailabilityCell({
  name,
  availability,
  url,
  prefix = '',
  suffix = '',
  icon,
}) {
  return (
    <ItemContainer>
      {icon}
      <Item>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {prefix}
          {availability ? (
            <span style={{ color: 'green' }}>{name}</span>
          ) : (
            <span style={{ color: 'red' }}>{name}</span>
          )}
          {suffix}
        </a>
      </Item>
    </ItemContainer>
  )
}

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

const CardWrapper = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
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
