import React from 'react'
import { useTranslation } from 'react-i18next'
import { NowIcon } from '../Icons'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function NowCard({ query }) {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [lowerCase]

  return (
    <Card title={t('providers.now')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.now.sh`}
            service="existence"
            message="Go to Now"
            link={`https://${name}.now.sh`}
            icon={<NowIcon />}
          />
        )}
      </Repeater>
    </Card>
  )
}
