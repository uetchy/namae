import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Card } from '../Card'
import { DedicatedAvailability } from '../Availability'
import { capitalize } from '../../util/text'

export default function GithubCard({ name }) {
  return (
    <Card
      title="GitHub"
      key={name}
      nameList={[name]}
      alternativeList={[
        `${name.toLowerCase()}hq`,
        `${name.toLowerCase()}-team`,
        `${capitalize(name)}Team`,
        `${name.toLowerCase()}-org`,
      ]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          provider="github"
          url={`https://github.com/${name}`}
          prefix="github.com/"
          icon={<FaGithub />}
        />
      )}
    </Card>
  )
}
