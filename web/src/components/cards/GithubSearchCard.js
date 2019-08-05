import React from 'react'
import useFetch from 'fetch-suspense'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'

import { Card, Result } from '../Cards'

function Search({ query }) {
  const searchQuery = encodeURIComponent(`${query} in:name`)
  const response = useFetch(
    `https://api.github.com/search/repositories?q=${searchQuery}&per_page=3`
  )
  const repos = response.items

  return (
    <>
      {repos.map((repo) => (
        <Result
          title={repo.full_name}
          message={`Star: ${repo.stargazers_count}`}
          link={repo.html_url}
          icon={<FaGithub />}
          key={repo.id}
        />
      ))}
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
