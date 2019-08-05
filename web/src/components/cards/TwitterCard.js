import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTwitter } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Cards'
import { capitalize } from '../../util/text'

export default function TwitterCard({ name }) {
  const { t } = useTranslation()

  return (
    <Card
      title={t('providers.twitter')}
      nameList={[name]}
      alternativeList={[
        `${name.toLowerCase()}app`,
        `hey${name.toLowerCase()}`,
        `${capitalize(name)}Team`,
        `${capitalize(name)}HQ`,
        `${name.toLowerCase()}_official`,
        `${name.toLowerCase()}-support`,
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
