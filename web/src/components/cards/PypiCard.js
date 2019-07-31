import React from 'react'
import { FaPython } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function PypiCard({ name }) {
  return (
    <Card title="PyPI" key={name} nameList={[name]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="pypi"
          link={`https://pypi.org/project/${name}`}
          icon={<FaPython />}
        />
      )}
    </Card>
  )
}
