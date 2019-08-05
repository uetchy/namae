import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaMapSigns } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function DomainCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  const names = [`${lowerCase}.com`, `${lowerCase}app.com`, `${lowerCase}.app`]
  const moreNames = [
    `${lowerCase}.dev`,
    `${lowerCase}.io`,
    `${lowerCase}.tools`,
    `get${lowerCase}.com`,
  ]

  return (
    <Card title={t('providers.domains')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            message="Go Domainr.com"
            service="domain"
            link={`https://domainr.com/?q=${name}`}
            icon={<FaMapSigns />}
          />
        )}
      </Repeater>
    </Card>
  )
}
