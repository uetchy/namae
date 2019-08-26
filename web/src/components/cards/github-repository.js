import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function GithubCard({ query }) {
  const { t } = useTranslation()
  const lowerCase = query.toLowerCase()

  const names = [query]
  const moreNames = [
    `${lowerCase}hq`,
    `${lowerCase}-team`,
    `${lowerCase}-org`,
    `${lowerCase}-js`,
  ]

  return (
    <Card title={t('providers.github')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`github.com/${name}`}
            service="existence"
            message="Create GitHub Organization"
            link="https://github.com/organizations/new"
            messageIfTaken={`Go to github.com/${name}`}
            linkIfTaken={`https://github.com/${name}`}
            prefix="github.com/"
            icon={<FaGithub />}
          />
        )}
      </Repeater>
    </Card>
  )
}
