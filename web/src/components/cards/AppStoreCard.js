import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaAppStore } from 'react-icons/fa'

import { Card, Result } from '../Cards'

function Search({ query }) {
  const term = encodeURIComponent(query)
  const response = useFetch(`/availability/appstore/${term}`)
  const apps = response.result

  return (
    <>
      {apps.map((app) => (
        <Result
          title={app.name}
          message={`Price: ${app.price}`}
          link={app.viewURL}
          icon={<FaAppStore />}
          key={app.id}
        />
      ))}
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
