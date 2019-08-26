import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaPython } from 'react-icons/fa'

import { capitalize } from '../../util/text'
import { Card, DedicatedAvailability, Repeater } from '../Cards'

export default function PypiCard({ query }) {
  const { t } = useTranslation()

  const names = [query]
  const moreNames = [`Py${capitalize(query)}`]

  return (
    <Card title={t('providers.pypi')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`pypi.org/pypi/${name}/json`}
            service="existence"
            message="Read Python Packaging User Guide"
            link="https://packaging.python.org/"
            messageIfTaken="Go to PyPI"
            linkIfTaken={`https://pypi.org/project/${name}`}
            icon={<FaPython />}
          />
        )}
      </Repeater>
    </Card>
  )
}
