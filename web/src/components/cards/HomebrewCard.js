import React from 'react'
import { IoIosBeer } from 'react-icons/io'
import { Card } from '../Card'
import { ExistentialAvailability } from '../Availability'

export default function HomebrewCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card title="Homebrew" key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <>
          <ExistentialAvailability
            name={name}
            target={`https://formulae.brew.sh/api/formula/${name}.json`}
            url={`https://formulae.brew.sh/formula/${name}`}
            icon={<IoIosBeer />}
          />
          <ExistentialAvailability
            name={name}
            target={`https://formulae.brew.sh/api/cask/${name}.json`}
            url={`https://formulae.brew.sh/cask/${name}`}
            suffix=" (Cask)"
            icon={<IoIosBeer />}
          />
        </>
      )}
    </Card>
  )
}
