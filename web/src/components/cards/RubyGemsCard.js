import React from 'react'
import { FaGem } from 'react-icons/fa'
import { Card } from '../Cards'
import { DedicatedAvailability } from '../Availability'

export default function RubyGemsCard({ name }) {
  return (
    <Card
      title="RubyGems"
      key={name}
      nameList={[name]}
      alternativeList={[`${name.toLowerCase()}-rb`]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="rubygems"
          link={`https://rubygems.org/gems/${name}`}
          icon={<FaGem />}
        />
      )}
    </Card>
  )
}
