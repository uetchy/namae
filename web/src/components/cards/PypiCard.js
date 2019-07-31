import React from 'react'
import { FaPython } from 'react-icons/fa'
import { Card } from '../Card'
import { DedicatedAvailability } from '../Availability'

export default function PypiCard({ name }) {
  return (
    <Card title="PyPI" key={name} nameList={[name]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          provider="pypi"
          url={`https://pypi.org/project/${name}`}
          icon={<FaPython />}
        />
      )}
    </Card>
  )
}
