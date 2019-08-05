import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'
import fetch from 'isomorphic-unfetch'
import { CustomSearchCard } from '../Cards'

export default function GithubSearchCard({ name }) {
  const { t } = useTranslation()

  return (
    <CustomSearchCard
      title={t('providers.githubSearch')}
      query={name}
      link={`https://github.com/search/${name}`}
      prefix="github.com/"
      icon={<FaGithub />}>
      {async (query) => {
        const response = await fetch(
          `https://api.github.com/repos/search?q=${query}`
        )
        const data = await response.json()
        console.log(data)
      }}
    </CustomSearchCard>
  )
}
