import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaSlack } from 'react-icons/fa'

import { Card, DedicatedAvailability, Repeater } from '../Cards'

export default function SlackCard({ query }) {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [lowerCase]

  return (
    <Card title={t('providers.slack')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="slack"
            link={`https://${name}.slack.com`}
            suffix=".slack.com"
            icon={<FaSlack />}
          />
        )}
      </Repeater>
    </Card>
  )
}
