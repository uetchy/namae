import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaAws } from 'react-icons/fa'

import { Card, DedicatedAvailability, Repeater } from '../Cards'

export default function S3Card({ query }) {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [lowerCase]

  return (
    <Card title={t('providers.s3')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`${name}.s3.amazonaws.com`}
            service="existence"
            message="Go to S3 console"
            link="https://s3.console.aws.amazon.com"
            messageIfTaken={`Go to ${name}.s3.amazonaws.com`}
            linkIfTaken={`https://${name}.s3.amazonaws.com`}
            suffix=".s3.amazonaws.com"
            icon={<FaAws />}
          />
        )}
      </Repeater>
    </Card>
  )
}
