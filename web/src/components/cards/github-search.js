import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaInfoCircle } from 'react-icons/fa'

import { Card, Result } from '../Cards'

function Search({ query }) {
  const { t } = useTranslation()
  const searchQuery = encodeURIComponent(`${query} in:name`)
  const limit = 10
  const response = useFetch(
    `https://api.github.com/search/repositories?q=${searchQuery}&per_page=${limit}`
  )
  const repos = response.items

  return (
    <>
      {repos.length > 0 ? (
        repos.map((repo) => (
          <Result
            title={repo.full_name}
            message={`${repo.description || repo.full_name} (🌟${
              repo.stargazers_count
            })`}
            link={repo.html_url}
            icon={<FaGithub />}
            key={repo.id}
          />
        ))
      ) : (
        <Result title={t('noResult')} icon={<FaInfoCircle />} />
      )}
    </>
  )
}

export default function GithubSearchCard({ query }) {
  const { t } = useTranslation()

  return (
    <Card title={t('providers.githubSearch')}>
      <Search query={query} />
    </Card>
  )
}
