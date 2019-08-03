import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaJsSquare } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function JsOrgCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  return (
    <Card title={t('providers.jsorg')} key={lowerCase} nameList={[lowerCase]}>
      {(name) => (
        <DedicatedAvailability
          name={`${name}.js.org`}
          service="dns"
          link={`https://${name}.js.org`}
          icon={<FaJsSquare />}
        />
      )}
    </Card>
  )
}
