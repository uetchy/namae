import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaGoogle, FaInfoCircle } from 'react-icons/fa'

import { Card, Result } from '../Cards'

function Search({ query }) {
  const term = `${query} app service -twitter -facebook -amazon -vimeo -linkedin -site:dictionary.cambridge.org -site:weblio.jp -site:appbank.net -いかがでした -キャンペーン`
  const response = useFetch(`/availability/google/${encodeURIComponent(term)}`)
  const items = response.result

  return (
    <>
      {items.length > 0 ? (
        items.map((item, i) => (
          <Result
            title={item.title}
            message={item.link}
            link={item.link}
            icon={<FaGoogle />}
            key={i}
          />
        ))
      ) : (
        <Result title="No Result" icon={<FaInfoCircle />} />
      )}
    </>
  )
}

export default function GoogleCard({ query }) {
  const { t } = useTranslation()

  return (
    <Card title={t('providers.google')}>
      <Search query={query} />
    </Card>
  )
}
