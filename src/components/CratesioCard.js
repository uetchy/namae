import React from 'react'
import { DiRust } from 'react-icons/di'
import { Card, CardTitle, DedicatedAvailability } from './Card'

export default function CratesioCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>crates.io (Rust)</CardTitle>
      <DedicatedAvailability
        name={lowerCase}
        provider="cratesio"
        url={`https://crates.io/crates/${lowerCase}`}
        icon={<DiRust />}
      />
    </Card>
  )
}
