import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function GithubCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  const names = [name]
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
            service="github"
            link={`https://github.com/${name}`}
            prefix="github.com/"
            icon={<FaGithub />}
          />
        )}
      </Repeater>
    </Card>
  )
}
