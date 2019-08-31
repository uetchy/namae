import React from 'react'
import { useTranslation } from 'react-i18next'
import { DiRust } from 'react-icons/di'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

const CratesioCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [lowerCase]

  return (
    <Card title={t('providers.rust')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`crates.io/api/v1/crates/${name}`}
            service="existence"
            link={`https://crates.io/crates/${name}`}
            icon={<DiRust />}
          />
        )}
      </Repeater>
    </Card>
  )
}

export default CratesioCard
