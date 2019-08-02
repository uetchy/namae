import React from 'react'
import { DiRust } from 'react-icons/di'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function CratesioCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card title="Rust" key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="cratesio"
          link={`https://crates.io/crates/${name}`}
          icon={<DiRust />}
        />
      )}
    </Card>
  )
}
