import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGem } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function RubyGemsCard({ query }) {
  const { t } = useTranslation()

  const names = [query]
  const moreNames = [`${query.toLowerCase()}-rb`]

  return (
    <Card title={t('providers.rubygems')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="rubygems"
            link={`https://rubygems.org/gems/${name}`}
            icon={<FaGem />}
          />
        )}
      </Repeater>
    </Card>
  )
}
