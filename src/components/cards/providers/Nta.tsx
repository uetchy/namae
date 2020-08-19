import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaBuilding, FaInfoCircle } from 'react-icons/fa'

import { Card, Result } from '../core'

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()
  const term = encodeURIComponent(query)
  const response = useFetch(`/api/services/nta/${term}`) as {
    result: Array<{ name: string; phoneticName: string }>
  }

  const apps = response.result

  return (
    <>
      {apps.length > 0 ? (
        apps.map((app, i) => (
          <Result
            title={app.name}
            message={`Phonetic: ${app.phoneticName}`}
            icon={<FaBuilding />}
            key={i}
          />
        ))
      ) : (
        <Result title={t('noResult')} icon={<FaInfoCircle />} />
      )}
    </>
  )
}

const NtaCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()

  return (
    <Card title={t('providers.nta')}>
      <Search query={query} />
    </Card>
  )
}

export default NtaCard
