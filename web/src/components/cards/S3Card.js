import React from 'react'
import { FaAws } from 'react-icons/fa'
import { Card } from '../Card'
import { DedicatedAvailability } from '../Availability'

export default function S3Card({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card title="AWS S3" key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          provider="s3"
          url={`https://${name}.s3.amazonaws.com`}
          suffix=".s3.amazonaws.com"
          icon={<FaAws />}
        />
      )}
    </Card>
  )
}
