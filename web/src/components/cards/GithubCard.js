import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'
import { capitalize } from '../../util/text'

export default function GithubCard({ name }) {
  const lowerCase = name.toLowerCase()

  return (
    <Card
      title="GitHub Organization"
      key={name}
      nameList={[name]}
      alternativeList={[
        `${lowerCase}hq`,
        `${lowerCase}-team`,
        `${capitalize(name)}Team`,
        `${lowerCase}-org`,
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
