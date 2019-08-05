import React from 'react'
import { useTranslation } from 'react-i18next'
import { DiRust } from 'react-icons/di'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Cards'

export default function CratesioCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  return (
    <Card title={t('providers.rust')} nameList={[lowerCase]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="cratesio"
          link={`https://crates.io/crates/${name}`}
          icon={<DiRust />}
        />
      )}
    </Card>
  )
}
