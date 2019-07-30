import React from 'react'
import { FaNpm } from 'react-icons/fa'
import { Card, CardTitle, DedicatedAvailability } from './Card'

export default function NpmCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>npm</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="npm"
        url={`https://www.npmjs.com/package/${name}`}
        prefix="npmjs.com/package/"
        icon={<FaNpm />}
      />
      <DedicatedAvailability
        name={name}
        provider="npm-org"
        url={`https://www.npmjs.com/org/${name}`}
        prefix="npmjs.com/org/"
        icon={<FaNpm />}
      />
    </Card>
  )
}
