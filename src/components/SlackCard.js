import React from 'react'
import { Card, CardTitle, DedicatedAvailability } from './Card'
import { FaSlack } from 'react-icons/fa'

export default function SlackCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>Slack</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="slack"
        url={`https://${name}.slack.com`}
        suffix=".slack.com"
        icon={<FaSlack />}
      />
    </Card>
  )
}
