import React from 'react'
import useFetch from 'fetch-suspense'
import { Card, AvailabilityCell } from './Card'
import { FaGithub } from 'react-icons/fa'

function GithubPanel({ name }) {
  const response = useFetch(`/availability/github/${name}`)

  if (response.error) {
    throw new Error(`GitHub: ${response.error}`)
  }

  return (
    <AvailabilityCell
      name={name}
      availability={response.availability}
      icon={<FaGithub />}
      url="https://github.com/"
      prefix="github.com/"
    />
  )
}

export default function GithubCard({ name }) {
  return (
    <Card key={name}>
      <GithubPanel name={name} />
    </Card>
  )
}
