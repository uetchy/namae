import React from 'react'
import { Card, CardTitle, DedicatedAvailability } from '../Card'
import { FaSlack } from 'react-icons/fa'

export default function SlackCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card key={lowerCase}>
      <CardTitle>Slack</CardTitle>
      <DedicatedAvailability
        name={lowerCase}
        provider="slack"
        url={`https://${lowerCase}.slack.com`}
        suffix=".slack.com"
        icon={<FaSlack />}
      />
    </Card>
  )
}
