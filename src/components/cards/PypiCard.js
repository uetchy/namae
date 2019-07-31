import React from 'react'
import { Card, CardTitle, DedicatedAvailability } from '../Card'
import { FaPython } from 'react-icons/fa'

export default function PypiCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>PyPI</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="pypi"
        url={`https://pypi.org/project/${name}`}
        icon={<FaPython />}
      />
    </Card>
  )
}
