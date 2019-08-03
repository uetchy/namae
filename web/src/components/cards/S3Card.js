import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaAws } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function S3Card({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  return (
    <Card title={t('providers.s3')} key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="s3"
          link={`https://${name}.s3.amazonaws.com`}
          suffix=".s3.amazonaws.com"
          icon={<FaAws />}
        />
      )}
    </Card>
  )
}
