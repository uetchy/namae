import React, { useState, Suspense } from 'react'
import styled from 'styled-components'

import { mobile } from '../util/css'

import useFetch from 'fetch-suspense'
import BarLoader from 'react-spinners/BarLoader'
import { GoInfo } from 'react-icons/go'
import { Tooltip } from 'react-tippy'
import { ExternalLink } from './Links'
import 'react-tippy/dist/tippy.css'

export function DedicatedAvailability({
  name,
  service,
  link,
  prefix = '',
  suffix = '',
  icon,
}) {
  const response = useFetch(`/availability/${service}/${name}`)

  if (response.error) {
    throw new Error(`${service}: ${response.error}`)
  }

  return (
    <AvailabilityResult
      availability={response.availability}
      name={name}
      link={link}
      prefix={prefix}
      suffix={suffix}
      icon={icon}
    />
  )
}

export function ExistentialAvailability({
  name,
  target,
  link,
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
    <AvailabilityResult
      name={name}
      availability={availability}
      link={link}
      prefix={prefix}
      suffix={suffix}
      icon={icon}
    />
  )
}

export function CustomSearchCard({
  title,
  query,
  link,
  prefix = '',
  suffix = '',
  icon,
  children,
}) {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardList>
        <ErrorHandler key={query}>{children(query)}</ErrorHandler>
      </CardList>
    </CardContainer>
  )
}

export function Card({ title, nameList = [], alternativeList = [], children }) {
  const [revealAlternatives, setRevealAlternatives] = useState(false)

  function onClick() {
    setRevealAlternatives(true)
  }

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardList>
        {nameList.map((name) => (
          <ErrorHandler key={name}>{children(name)}</ErrorHandler>
        ))}
        {revealAlternatives &&
          alternativeList.map((name) => (
            <ErrorHandler key={name}>{children(name)}</ErrorHandler>
          ))}
        {alternativeList.length > 0 && !revealAlternatives ? (
          <Button onClick={onClick}>show more</Button>
        ) : null}
      </CardList>
    </CardContainer>
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

  render() {
    if (this.state.hasError) {
      return (
        <Tooltip
          title={this.state.message}
          position="bottom"
          arrow={true}
          animation="shift"
          duration="200">
          <ResultContainer>
            <ResultItem>
              <GoInfo />
              <ResultName>Error</ResultName>
            </ResultItem>
          </ResultContainer>
        </Tooltip>
      )
    }
    return this.props.children
  }
}

const ErrorHandler = ({ children }) => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <ResultContainer>
          <BarLoader />
        </ResultContainer>
      }>
      {children}
    </Suspense>
  </ErrorBoundary>
)

const AvailabilityResult = ({
  name,
  availability,
  link,
  prefix = '',
  suffix = '',
  icon,
}) => (
  <ResultContainer>
    <ResultItem color={availability ? 'green' : 'red'}>
      {icon}
      <ResultName>
        <ExternalLink href={link}>
          {prefix}
          {name}
          {suffix}
        </ExternalLink>
      </ResultName>
    </ResultItem>
  </ResultContainer>
)

const CardContainer = styled.div`
  padding: 40px;

  ${mobile} {
    margin-bottom: 40px;
    padding: 0px;
  }
`

const CardTitle = styled.div`
  margin-bottom: 15px;
  font-size: 1rem;
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

const Button = styled.div`
  margin-top: 5px;
  display: inline-block;
  padding: 5px 0;
  border: none;
  border-bottom: 1px dashed black;
  cursor: pointer;
  font-family: monospace;
  font-size: 0.8em;
`

const ResultContainer = styled.div`
  min-height: 1em;
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const ResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  word-break: break-all;
  color: ${({ color }) => color};
`

const ResultName = styled.div`
  margin-left: 6px;
  font-family: monospace;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`
