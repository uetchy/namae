import React from 'react'
import { Card, CardTitle, ExistentialAvailability } from '../Card'
import { IoIosBeer } from 'react-icons/io'

export default function HomebrewCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>Homebrew</CardTitle>
      <ExistentialAvailability
        name={lowerCase}
        target={`https://formulae.brew.sh/api/formula/${lowerCase}.json`}
        url={`https://formulae.brew.sh/formula/${lowerCase}`}
        icon={<IoIosBeer />}
      />
      <ExistentialAvailability
        name={lowerCase}
        target={`https://formulae.brew.sh/api/cask/${lowerCase}.json`}
        url={`https://formulae.brew.sh/cask/${lowerCase}`}
        suffix=" (Cask)"
        icon={<IoIosBeer />}
      />
    </Card>
  )
}
