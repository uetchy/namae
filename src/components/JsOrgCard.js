import React from 'react'
import { FaJsSquare } from 'react-icons/fa'
import { Card, CardTitle, DedicatedAvailability } from './Card'

export default function JsOrgCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>js.org</CardTitle>
      <DedicatedAvailability
        name={`${lowerCase}.js.org`}
        provider="dns"
        url={`https://${lowerCase}.js.org`}
        icon={<FaJsSquare />}
      />
    </Card>
  )
}
