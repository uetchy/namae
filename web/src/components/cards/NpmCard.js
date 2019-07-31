import React from 'react'
import { FaNpm } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function NpmCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card title="npm" key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <>
          <DedicatedAvailability
            name={name}
            service="npm"
            link={`https://www.npmjs.com/package/${name}`}
            prefix="npmjs.com/"
            icon={<FaNpm />}
          />
          <DedicatedAvailability
            name={name}
            service="npm-org"
            link={`https://www.npmjs.com/org/${name}`}
            prefix="npmjs.com/~"
            suffix=" (Org)"
            icon={<FaNpm />}
          />
        </>
      )}
    </Card>
  )
}
