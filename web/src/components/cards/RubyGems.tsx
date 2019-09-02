import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGem } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from './core'

const RubyGemsCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()

  const names = [query]
  const moreNames = [`${query.toLowerCase()}-rb`]

  return (
    <Card title={t('providers.rubygems')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`rubygems.org/gems/${name}`}
            service="existence"
            message="Read Publishing Guide"
            link="https://guides.rubygems.org/publishing/"
            messageIfTaken="Go to RubyGems"
            linkIfTaken={`https://rubygems.org/gems/${name}`}
            icon={<FaGem />}
          />
        )}
      </Repeater>
    </Card>
  )
}

export default RubyGemsCard
