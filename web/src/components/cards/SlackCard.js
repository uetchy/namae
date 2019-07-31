import React from 'react'
import { FaSlack } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function SlackCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card title="Slack" key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="slack"
          link={`https://${name}.slack.com`}
          suffix=".slack.com"
          icon={<FaSlack />}
        />
      )}
    </Card>
  )
}
