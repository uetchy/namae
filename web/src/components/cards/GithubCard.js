import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'
import { capitalize } from '../../util/text'

export default function GithubCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  return (
    <Card
      title={t('providers.github')}
      nameList={[name]}
      alternativeList={[
        `${lowerCase}hq`,
        `${lowerCase}-team`,
        `${lowerCase}-org`,
        `${capitalize(name)}-js`,
      ]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="github"
          link={`https://github.com/${name}`}
          prefix="github.com/"
          icon={<FaGithub />}
        />
      )}
    </Card>
  )
}
