import React from 'react'
import { Card, CardTitle, DedicatedAvailability } from './Card'
import { FaAws } from 'react-icons/fa'

export default function S3Card({ name }) {
  return (
    <Card key={name}>
      <CardTitle>AWS S3</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="s3"
        url={`https://${name}.s3.amazonaws.com`}
        suffix=".s3.amazonaws.com"
        icon={<FaAws />}
      />
    </Card>
  )
}
