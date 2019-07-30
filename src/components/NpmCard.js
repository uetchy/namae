import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, AvailabilityCell } from './Card'
import { FaNpm } from 'react-icons/fa'

function NpmPanel({ name }) {
  const response = useFetch(`/availability/npm/${name}`)

  if (response.error) {
    throw new Error(`npm: ${response.error}`)
  }

  return (
    <>
      <AvailabilityCell
        name={name}
        availability={response.packageAvailability}
        icon={<FaNpm />}
        url="https://www.npmjs.com/package/"
        prefix="npmjs.com/package/"
      />
      <AvailabilityCell
        name={name}
        availability={response.orgAvailability}
        icon={<FaNpm />}
        url="https://www.npmjs.com/org/"
        prefix="npmjs.com/org/"
      />
    </>
  )
}

export default function NpmCard({ name }) {
  return (
    <Card key={name.toLowerCase()}>
      <NpmPanel name={name.toLowerCase()} />
    </Card>
  )
}
