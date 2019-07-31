import React from 'react'
import { FaMapSigns } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function DomainCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card
      title="Domain"
      key={lowerCase}
      nameList={[`${lowerCase}.com`, `${lowerCase}app.com`, `${lowerCase}.app`]}
      alternativeList={[
        `${lowerCase}.dev`,
        `${lowerCase}.io`,
        `${lowerCase}.build`,
        `get${lowerCase}.com`,
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
