import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaInfoCircle } from 'react-icons/fa'

import { Card, Result } from './core'

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()
  const searchQuery = encodeURIComponent(`${query} in:name`)
  const limit = 10
  const response = useFetch(
    `https://api.github.com/search/repositories?q=${searchQuery}&per_page=${limit}`
  ) as {
    items: Array<{
      full_name: string
      description: string
      stargazers_count: number
      html_url: string
      id: string
    }>
  }
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

const GithubSearchCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()

  return (
    <Card title={t('providers.githubSearch')}>
      <Search query={query} />
    </Card>
  )
}

export default GithubSearchCard
