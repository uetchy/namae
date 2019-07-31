import React from 'react'
import { FaMapSigns } from 'react-icons/fa'
import { Card } from '../Card'
import { DedicatedAvailability } from '../Availability'

export default function DomainCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card
      title="Domain"
      key={lowerCase}
      nameList={[`${lowerCase}.app`, `${lowerCase}.dev`, `${lowerCase}.org`]}
      alternativeList={[
        `${lowerCase}app.com`,
        `${lowerCase}.build`,
        `${lowerCase}.ai`,
      ]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="domain"
          link={`https://domainr.com/?q=${name}`}
          icon={<FaMapSigns />}
        />
      )}
    </Card>
  )
}
