import React from 'react'
import { DiRust } from 'react-icons/di'
import { Card, CardTitle, DedicatedAvailability } from './Card'

export default function CratesioCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>crates.io (Rust)</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="cratesio"
        url={`https://crates.io/crates/${name}`}
        icon={<DiRust />}
      />
    </Card>
  )
}
