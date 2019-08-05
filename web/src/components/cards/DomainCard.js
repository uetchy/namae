import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaMapSigns } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Cards'

export default function DomainCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  return (
    <Card
      title={t('providers.domains')}
      nameList={[`${lowerCase}.com`, `${lowerCase}app.com`, `${lowerCase}.app`]}
      alternativeList={[
        `${lowerCase}.dev`,
        `${lowerCase}.io`,
        `${lowerCase}.tools`,
        `get${lowerCase}.com`,
      ]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="domain"
          link={`https://domainr.com/?q=${name}`}
          icon={<FaMapSigns />}
        />
      )}
    </Card>
  )
}
