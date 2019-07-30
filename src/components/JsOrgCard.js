import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, CardTitle, AvailabilityCell } from './Card'
import { FaJsSquare } from 'react-icons/fa'

function Availability({ name }) {
  const response = useFetch(`/availability/jsorg/${name}`)

  if (response.error) {
    throw new Error(`Twitter: ${response.error}`)
  }

  return (
    <AvailabilityCell
      name={name}
      availability={response.availability}
      url={`https://${name}.js.org`}
      suffix=".js.org"
      icon={<FaJsSquare />}
    />
  )
}

export default function JsOrgCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>js.org</CardTitle>
      <Availability name={name} />
    </Card>
  )
}
