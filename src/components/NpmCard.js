import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, CardTitle, AvailabilityCell } from './Card'
import { FaNpm } from 'react-icons/fa'

function Availability({ name }) {
  const response = useFetch(`/availability/npm/${name}`)

  if (response.error) {
    throw new Error(`npm: ${response.error}`)
  }

  return (
    <>
      <AvailabilityCell
        name={name}
        availability={response.packageAvailability}
        url={`https://www.npmjs.com/package/${name}`}
        prefix="npmjs.com/package/"
        icon={<FaNpm />}
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
    <Card key={name}>
      <CardTitle>npm</CardTitle>
      <Availability name={name.toLowerCase()} />
    </Card>
  )
}
