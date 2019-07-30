import React from 'react'
import { Card, CardTitle, ExistenceAvailability } from './Card'
import { IoIosBeer } from 'react-icons/io'

export default function HomebrewCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>Homebrew</CardTitle>
      <ExistenceAvailability
        name={name}
        target={`https://formulae.brew.sh/api/formula/${name}.json`}
        url={`https://formulae.brew.sh/formula/${name}`}
        icon={<IoIosBeer />}
      />
    </Card>
  )
}
