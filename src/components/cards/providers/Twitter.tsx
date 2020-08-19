import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'

import { capitalize } from '../../../util/text'
import { Card, Repeater, DedicatedAvailability } from '../core'

const TwitterCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()

  const sanitizedQuery = query.replace(/[^0-9a-zA-Z_-]/g, '').replace(/-/g, '_')
  const lowerCase = sanitizedQuery.toLowerCase()
  const capitalCase = capitalize(sanitizedQuery)

  const names = [sanitizedQuery, `${capitalCase}App`, `${lowerCase}hq`]
  const moreNames = [
    `hey${lowerCase}`,
    `${capitalCase}Team`,
    `${lowerCase}_support`,
    `${lowerCase}_org`,
    `${lowerCase}_app`,
    `${capitalCase}JS`,
  ]

  return (
    <Card title={t('providers.twitter')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={name}
            service="twitter"
            message="Go to Twitter"
            link={`https://twitter.com/${name}`}
            icon={<FaTwitter />}
          />
        )}
      </Repeater>
    </Card>
  )
}

export default TwitterCard
