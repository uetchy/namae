import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGem } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function RubyGemsCard({ name }) {
  const { t } = useTranslation()

  return (
    <Card
      title={t('providers.rubygems')}
      key={name}
      nameList={[name]}
      alternativeList={[`${name.toLowerCase()}-rb`]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="rubygems"
          link={`https://rubygems.org/gems/${name}`}
          icon={<FaGem />}
        />
      )}
    </Card>
  )
}
