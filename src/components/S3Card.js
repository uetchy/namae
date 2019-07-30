import React from 'react'
import { Card, CardTitle, DedicatedAvailability } from './Card'
import { FaAws } from 'react-icons/fa'

export default function S3Card({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>AWS S3</CardTitle>
      <DedicatedAvailability
        name={lowerCase}
        provider="s3"
        url={`https://${lowerCase}.s3.amazonaws.com`}
        suffix=".s3.amazonaws.com"
        icon={<FaAws />}
      />
    </Card>
  )
}
