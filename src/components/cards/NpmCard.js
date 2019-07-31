import React from 'react'
import { FaNpm } from 'react-icons/fa'
import { Card, CardTitle, DedicatedAvailability } from '../Card'

export default function NpmCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>npm</CardTitle>
      <DedicatedAvailability
        name={lowerCase}
        provider="npm"
        url={`https://www.npmjs.com/package/${lowerCase}`}
        prefix="npmjs.com/"
        icon={<FaNpm />}
      />
      <DedicatedAvailability
        name={lowerCase}
        provider="npm-org"
        url={`https://www.npmjs.com/org/${lowerCase}`}
        prefix="npmjs.com/~"
        suffix=" (Org)"
        icon={<FaNpm />}
      />
    </Card>
  )
}
