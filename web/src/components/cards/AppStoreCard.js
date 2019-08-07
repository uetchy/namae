import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaAppStore, FaInfoCircle } from 'react-icons/fa'

import { Card, Result } from '../Cards'

function Search({ query }) {
  const { t } = useTranslation()
  const term = encodeURIComponent(query)
  const response = useFetch(
    `/availability/appstore/${term}?country=${t('countryCode')}`
  )
  const apps = response.result

  return (
    <>
      {apps.length > 0 ? (
        apps.map((app) => (
          <Result
            title={app.name}
            message={`Price: ${app.price}`}
            link={app.viewURL}
            icon={<FaAppStore />}
            key={app.id}
          />
        ))
      ) : (
        <Result title="No Result" icon={<FaInfoCircle />} />
      )}
    </>
  )
}

export default function AppStoreCard({ query }) {
  const { t } = useTranslation()

  return (
    <Card title={t('providers.appStore')}>
      <Search query={query} />
    </Card>
  )
}
