import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaNpm } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function NpmCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  const names = [lowerCase]
  const moreNames = [`${lowerCase}-js`]

  return (
    <Card title={t('providers.npm')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <>
            <DedicatedAvailability
              name={name}
              service="npm"
              link={`https://www.npmjs.com/package/${name}`}
              icon={<FaNpm />}
            />
            <DedicatedAvailability
              name={name}
              service="npm-org"
              link={`https://www.npmjs.com/org/${name}`}
              prefix="@"
              suffix=" (Organization)"
              icon={<FaNpm />}
            />
          </>
        )}
      </Repeater>
    </Card>
  )
}
