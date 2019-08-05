import React from 'react'
import { useTranslation } from 'react-i18next'
import { DiUbuntu } from 'react-icons/di'
import { DiDebian } from 'react-icons/di'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function LinuxCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  const names = [lowerCase]

  return (
    <Card title={t('providers.linux')}>
      <Repeater items={names}>
        {(name) => (
          <>
            <DedicatedAvailability
              name={name}
              service="launchpad"
              link={`https://launchpad.net/ubuntu/+source/${name}`}
              prefix="launchpad:"
              icon={<DiUbuntu />}
            />
            <DedicatedAvailability
              name={name}
              service="debian"
              link={`https://packages.debian.org/buster/${name}`}
              prefix="debian:"
              icon={<DiDebian />}
            />
          </>
        )}
      </Repeater>
    </Card>
  )
}
