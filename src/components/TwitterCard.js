import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, CardTitle, AvailabilityCell } from './Card'
import { FaTwitter } from 'react-icons/fa'

function Availability({ name }) {
  const response = useFetch(`/availability/twitter/${name}`)

  if (response.error) {
    throw new Error(`Twitter: ${response.error}`)
  }

  return (
    <AvailabilityCell
      name={name}
      availability={response.availability}
      url={`https://twitter.com/${name}`}
      prefix="twitter.com/"
      icon={<FaTwitter />}
    />
  )
}

export default function TwitterCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>Twitter</CardTitle>
      <Availability name={name} />
    </Card>
  )
}
