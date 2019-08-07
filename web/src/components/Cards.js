import React, { useState, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import useFetch from 'fetch-suspense'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import BarLoader from 'react-spinners/BarLoader'
import { GoInfo } from 'react-icons/go'

import { ExternalLink } from './Links'
import { mobile } from '../util/css'

const COLORS = {
  available: '#6e00ff',
  unavailable: 'darkgrey',
  error: '#ff388b',
}

export function Card({ title, children }) {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>
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
      </CardContent>
    </CardContainer>
  )
}

export function Repeater({ items = [], moreItems = [], children }) {
  const [revealAlternatives, setRevealAlternatives] = useState(false)

  function onClick() {
    setRevealAlternatives(true)
  }

  useEffect(() => {
    setRevealAlternatives(false)
  }, [items, moreItems])

  return (
    <>
      {items.map((name) => (
        <CellError key={name}>{children(name)}</CellError>
      ))}

      {revealAlternatives
        ? moreItems.map((name) => (
            <CellError key={name}>{children(name)}</CellError>
          ))
        : null}
      {moreItems.length > 0 && !revealAlternatives ? (
        <Button onClick={onClick}>show more</Button>
      ) : null}
    </>
  )
}

export function DedicatedAvailability({
  name,
  message = '',
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
    <Result
      title={name}
      message={message}
      link={link}
      icon={icon}
      color={response.availability ? COLORS.available : COLORS.unavailable}
      prefix={prefix}
      suffix={suffix}
    />
  )
}

export function ExistentialAvailability({
  name,
  message = '',
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
    <Result
      title={name}
      message={message}
      link={link}
      icon={icon}
      color={availability ? COLORS.available : COLORS.unavailable}
      prefix={prefix}
      suffix={suffix}
    />
  )
}

export const Result = ({
  title,
  message = '',
  link,
  icon,
  color = 'inherit',
  prefix = '',
  suffix = '',
}) => {
  const content = (
    <>
      {prefix}
      {title}
      {suffix}
    </>
  )
  return (
    <ResultContainer>
      <Tooltip
        title={message}
        position="bottom"
        arrow={true}
        animation="shift"
        duration="200">
        <ResultItem color={color}>
          <ResultIcon>{icon}</ResultIcon>
          <ResultName>
            {link ? (
              <ExternalLink href={link}>{content}</ExternalLink>
            ) : (
              content
            )}
          </ResultName>
        </ResultItem>
      </Tooltip>
    </ResultContainer>
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
            <ResultItem color={COLORS.error}>
              <ResultIcon>
                <GoInfo />
              </ResultIcon>
              <ResultName>Error</ResultName>
            </ResultItem>
          </ResultContainer>
        </Tooltip>
      )
    }
    return this.props.children
  }
}

const CellError = ({ children }) => (
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

const CardContent = styled.div`
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
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const ResultIcon = styled.div`
  width: 1em;
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
  line-height: 1em;
  font-family: monospace;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`
