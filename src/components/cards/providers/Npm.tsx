import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaNpm } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../core'

const NpmCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [lowerCase, `${lowerCase}-js`]
  const moreNames = [`${lowerCase}js`]

  return (
    <Card title={t('providers.npm')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <>
            <DedicatedAvailability
              name={name}
              service="npm"
              message={`See ${name}`}
              link={`https://www.npmjs.com/package/${name}`}
              messageIfTaken={`See ${name}`}
              linkIfTaken={`https://www.npmjs.com/package/${name}`}
              icon={<FaNpm />}
            />
            <DedicatedAvailability
              name={name}
              service="npm-org"
              message="Create Org"
              link="https://www.npmjs.com/org/create"
              messageIfTaken={`See @${name}`}
              linkIfTaken={`https://www.npmjs.com/org/${name}`}
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

export default NpmCard
