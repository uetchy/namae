import React from 'react'
import { FaNpm } from 'react-icons/fa'
import { Card } from '../Card'
import { DedicatedAvailability } from '../Availability'

export default function NpmCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card title="npm" key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <>
          <DedicatedAvailability
            name={name}
            provider="npm"
            url={`https://www.npmjs.com/package/${name}`}
            prefix="npmjs.com/"
            icon={<FaNpm />}
          />
          <DedicatedAvailability
            name={name}
            provider="npm-org"
            url={`https://www.npmjs.com/org/${name}`}
            prefix="npmjs.com/~"
            suffix=" (Org)"
            icon={<FaNpm />}
          />
        </>
      )}
    </Card>
  )
}
