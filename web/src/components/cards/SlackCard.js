import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaSlack } from 'react-icons/fa'

import { Card, DedicatedAvailability, Repeater } from '../Cards'

export default function SlackCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

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
