import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'
import { capitalize } from '../../util/text'

export default function TwitterCard({ name }) {
  const { t } = useTranslation()

  return (
    <Card
      title={t('providers.twitter')}
      key={name}
      nameList={[name]}
      alternativeList={[
        `${capitalize(name)}HQ`,
        `${name.toLowerCase()}app`,
        `${name.toLowerCase()}-support`,
        `${capitalize(name)}Team`,
        `${capitalize(name)}Official`,
      ]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="twitter"
          link={`https://twitter.com/${name}`}
          prefix="twitter.com/"
          icon={<FaTwitter />}
        />
      )}
    </Card>
  )
}
