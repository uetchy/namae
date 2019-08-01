import React, { Suspense } from 'react'
import styled from 'styled-components'
import useFetch from 'fetch-suspense'
import { BarLoader } from 'react-spinners'
import { GoInfo } from 'react-icons/go'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

import { ExternalLink } from './Links'

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
      return (
        <Tooltip
          title={this.state.message}
          position="bottom"
          arrow={true}
          animation="shift"
          duration="200">
          <Container>
            <Cell>
              <GoInfo />
              <Name>Error</Name>
            </Cell>
          </Container>
        </Tooltip>
      )
    }
    return this.props.children
  }
}

const Result = ({
  name,
  availability,
  link,
  prefix = '',
  suffix = '',
  icon,
}) => (
  <Container>
    <Cell availability={availability}>
      {icon}
      <Name>
        <ExternalLink href={link}>
          {prefix}
          {name}
          {suffix}
        </ExternalLink>
      </Name>
    </Cell>
  </Container>
)

const Fallback = () => (
  <Container>
    <BarLoader />
  </Container>
)

export const AvailabilityContainer = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<Fallback />}>{children}</Suspense>
  </ErrorBoundary>
)

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
    <Result
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
    <Result
      name={name}
      availability={availability}
      link={link}
      prefix={prefix}
      suffix={suffix}
      icon={icon}
    />
  )
}

const Container = styled.div`
  min-height: 1em;
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  word-break: break-all;
  color: ${({ availability }) => (availability ? 'green' : 'red')};
`

const Name = styled.div`
  margin-left: 6px;
  font-family: monospace;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`
