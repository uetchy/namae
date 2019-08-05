import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'

import { capitalize } from '../../util/text'
import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function TwitterCard({ name }) {
  const { t } = useTranslation()

  const names = [name]
  const moreNames = [
    `${name.toLowerCase()}app`,
    `hey${name.toLowerCase()}`,
    `${capitalize(name)}Team`,
    `${capitalize(name)}HQ`,
    `${name.toLowerCase()}_official`,
    `${name.toLowerCase()}-support`,
  ]

  return (
    <Card title={t('providers.twitter')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="twitter"
            link={`https://twitter.com/${name}`}
            prefix="twitter.com/"
            icon={<FaTwitter />}
          />
        )}
      </Repeater>
    </Card>
  )
}
