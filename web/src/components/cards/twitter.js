import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'

import { capitalize } from '../../util/text'
import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function TwitterCard({ query }) {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()
  const capitalCase = capitalize(query)

  const names = [query]
  const moreNames = [
    `${lowerCase}app`,
    `hey${lowerCase}`,
    `${capitalCase}Team`,
    `${capitalCase}HQ`,
    `${lowerCase}_official`,
    `${lowerCase}-support`,
  ]

  return (
    <Card title={t('providers.twitter')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`twitter.com/${name}`}
            service="existence"
            message="Go to Twitter"
            link={`https://twitter.com/${name}`}
            prefix="twitter.com/"
            icon={<FaTwitter />}
          />
        )}
      </Repeater>
    </Card>
  )
}
