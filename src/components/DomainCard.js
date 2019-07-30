import React from 'react'
import { Card, CardTitle, DedicatedAvailability } from './Card'
import { FaMapSigns } from 'react-icons/fa'

export default function DomainCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>Domain</CardTitle>
      <DedicatedAvailability
        name={`${name}.app`}
        provider="domain"
        url={`https://${name}.app`}
        icon={<FaMapSigns />}
      />
      <DedicatedAvailability
        name={`${name}.dev`}
        provider="domain"
        url={`https://${name}.dev`}
        icon={<FaMapSigns />}
      />
      <DedicatedAvailability
        name={`${name}.org`}
        provider="domain"
        url={`https://${name}.org`}
        icon={<FaMapSigns />}
      />
    </Card>
  )
}
