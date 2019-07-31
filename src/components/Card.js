import React, { Suspense, useState } from 'react'
import styled from 'styled-components'
import useFetch from 'fetch-suspense'
import { BarLoader } from 'react-spinners'
import { mobile } from '../util/css'

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
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  ${mobile} {
    flex-direction: column;
  }
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

export function DedicatedAvailability({
  name,
  provider,
  url,
  prefix = '',
  suffix = '',
  icon,
}) {
  const response = useFetch(`/availability/${provider}/${name}`)

  if (response.error) {
    throw new Error(`${provider}: ${response.error}`)
  }

  return (
    <AvailabilityCell
      availability={response.availability}
      name={name}
      url={url}
      prefix={prefix}
      suffix={suffix}
      icon={icon}
    />
  )
}

export function ExistenceAvailability({
  name,
  target,
  prefix = '',
  suffix = '',
  icon,
}) {
  const response = useFetch(target, null, { metadata: true })

  if (response.status !== 404 && response.status !== 200) {
    throw new Error(`${name}: ${response.status}`)
  }

  const availability = response.status === 404

  return (
    <AvailabilityCell
      name={name}
      availability={availability}
      url={`https://formulae.brew.sh/formula/${name}`}
      prefix={prefix}
      suffix={suffix}
      icon={icon}
    />
  )
}

export function Alternatives({ nameList, children }) {
  const [show, setShow] = useState(false)

  function onClick() {
    setShow(true)
  }

  return (
    <>
      {show ? (
        nameList.map((name) => (
          <ErrorBoundary>
            <Suspense
              fallback={
                <ItemContainer>
                  <BarLoader />
                </ItemContainer>
              }>
              {children(name)}
            </Suspense>
          </ErrorBoundary>
        ))
      ) : (
        <ShowAlternativesButton onClick={onClick}>
          show alternatives
        </ShowAlternativesButton>
      )}
    </>
  )
}

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

const ItemContainer = styled.div`
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
