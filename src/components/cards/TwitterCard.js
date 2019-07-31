import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { Card, CardTitle, DedicatedAvailability, Alternatives } from '../Card'
import { capitalize } from '../../util/text'

export default function TwitterCard({ name }) {
  return (
    <Card key={name}>
      <CardTitle>Twitter</CardTitle>
      <DedicatedAvailability
        name={name}
        provider="twitter"
        url={`https://twitter.com/${name}`}
        prefix="twitter.com/"
        icon={<FaTwitter />}
      />
      <Alternatives
        nameList={[
          `${capitalize(name)}HQ`,
          `${name.toLowerCase()}app`,
          `${name.toLowerCase()}-support`,
          `${capitalize(name)}Team`,
        ]}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            provider="twitter"
            url={`https://twitter.com/${name}`}
            prefix="twitter.com/"
            icon={<FaTwitter />}
          />
        )}
      </Alternatives>
    </Card>
  )
}
