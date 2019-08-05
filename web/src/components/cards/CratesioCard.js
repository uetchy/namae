import React from 'react'
import { useTranslation } from 'react-i18next'
import { DiRust } from 'react-icons/di'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function CratesioCard({ query }) {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [lowerCase]

  return (
    <Card title={t('providers.rust')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="cratesio"
            link={`https://crates.io/crates/${name}`}
            icon={<DiRust />}
          />
        )}
      </Repeater>
    </Card>
  )
}
