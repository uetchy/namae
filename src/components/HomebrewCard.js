import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, CardTitle, AvailabilityCell } from './Card'
import { IoIosBeer } from 'react-icons/io'

function Availability({ name }) {
  const response = useFetch(
    `https://formulae.brew.sh/api/formula/${name}.json`,
    null,
    { metadata: true }
  )

  if (response.status !== 404 && response.status !== 200) {
    throw new Error(`Homebrew: ${response.statusText}`)
  }

  const availability = response.status === 404

  return (
    <AvailabilityCell
      name={name}
      availability={availability}
      url={`https://formulae.brew.sh/formula/${name}`}
      icon={<IoIosBeer />}
    />
  )
}

export default function HomebrewCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>Homebrew</CardTitle>
      <Availability name={name} />
    </Card>
  )
}
