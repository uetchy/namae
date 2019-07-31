import React from 'react'
import styled from 'styled-components'
import useFetch from 'fetch-suspense'
import { BarLoader } from 'react-spinners'

function AvailabilityCell({
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

export const Fallback = () => (
  <ItemContainer>
    <BarLoader />
  </ItemContainer>
)

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

export function ExistentialAvailability({
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
