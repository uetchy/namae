import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, AvailabilityCell } from './Card'
import { FaTwitter } from 'react-icons/fa'

function TwitterPanel({ name }) {
  const response = useFetch(`/availability/twitter/${name}`)

  if (response.error) {
    throw new Error(`Twitter: ${response.error}`)
  }

  return (
    <AvailabilityCell
      name={name}
      availability={response.availability}
      icon={<FaTwitter />}
      url="https://twitter.com/"
      prefix="twitter.com/"
    />
  )
}

export default function TwitterCard({ name }) {
  return (
    <Card key={name}>
      <TwitterPanel name={name} />
    </Card>
  )
}
