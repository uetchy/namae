import React from 'react'
import { Card, CardTitle, DedicatedAvailability, Alternatives } from './Card'
import { FaMapSigns } from 'react-icons/fa'

export default function DomainCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>Domain</CardTitle>
      <DedicatedAvailability
        name={`${lowerCase}.app`}
        provider="domain"
        url={`https://domainr.com/?q=${lowerCase}.app`}
        icon={<FaMapSigns />}
      />
      <DedicatedAvailability
        name={`${lowerCase}.dev`}
        provider="domain"
        url={`https://domainr.com/?q=${lowerCase}.dev`}
        icon={<FaMapSigns />}
      />
      <DedicatedAvailability
        name={`${lowerCase}.org`}
        provider="domain"
        url={`https://domainr.com/?q=${lowerCase}.org`}
        icon={<FaMapSigns />}
      />
      <Alternatives
        nameList={[
          `${lowerCase}app.com`,
          `${lowerCase}.build`,
          `${lowerCase}.ai`,
        ]}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            provider="domain"
            url={`https://domainr.com/?q=${name}.org`}
            icon={<FaMapSigns />}
          />
        )}
      </Alternatives>
    </Card>
  )
}
