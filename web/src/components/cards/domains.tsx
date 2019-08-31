import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaMapSigns } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

const DomainCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [`${lowerCase}.com`, `${lowerCase}.app`]
  const moreNames = [
    `${lowerCase}app.com`,
    `get${lowerCase}.com`,
    `${lowerCase}.dev`,
    `${lowerCase}.io`,
    `${lowerCase}.tools`,
  ]

  return (
    <Card title={t('providers.domains')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            message="Go to Domainr.com"
            service="domain"
            link={`https://domainr.com/?q=${name}`}
            icon={<FaMapSigns />}
          />
        )}
      </Repeater>
    </Card>
  )
}

export default DomainCard
