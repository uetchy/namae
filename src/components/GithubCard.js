import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { Card, CardTitle, DedicatedAvailability, Alternatives } from './Card'
import { capitalize } from '../util/text'

export default function GithubCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>GitHub</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="github"
        url={`https://github.com/${name}`}
        prefix="github.com/"
        icon={<FaGithub />}
      />
      <Alternatives
        nameList={[
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
      </Alternatives>
    </Card>
  )
}
