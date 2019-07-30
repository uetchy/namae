import React from 'react'
import { FaJsSquare } from 'react-icons/fa'
import { Card, CardTitle, DedicatedAvailability } from './Card'

export default function JsOrgCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>js.org</CardTitle>
      <DedicatedAvailability
        name={`${name}.js.org`}
        provider="dns"
        url={`https://${name}.js.org`}
        icon={<FaJsSquare />}
      />
    </Card>
  )
}
