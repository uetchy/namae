import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaPython } from 'react-icons/fa'

import { capitalize } from '../../util/text'
import { Card, DedicatedAvailability, Repeater } from '../Cards'

export default function PypiCard({ name }) {
  const { t } = useTranslation()

  const names = [name]
  const moreNames = [`Py${capitalize(name)}`]

  return (
    <Card title={t('providers.pypi')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="pypi"
            link={`https://pypi.org/project/${name}`}
            icon={<FaPython />}
          />
        )}
      </Repeater>
    </Card>
  )
}
