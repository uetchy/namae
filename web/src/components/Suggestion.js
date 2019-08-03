import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { capitalize } from '../util/text'

export default function Suggestion({ query, onSubmit }) {
  const { t } = useTranslation()
  const capital = capitalize(query)
  const lower = query.toLowerCase()

  const suggestions = [
    `${lower}ify`,
    `insta${lower}`,
    `lib${lower}`,
    `omni${lower}`,
    `${capital}Lab`,
    `${capital}Kit`,
    `Open${capital}`,
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  function applyQuery(name) {
    onSubmit(name)
  }

  return (
    <Container>
      <Title>{t('try')}</Title>
      <Items>
        {suggestions.map((name) => (
          <Item key={name} onClick={() => applyQuery(name)}>
            {name}
          </Item>
        ))}
      </Items>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1em;
`

const Title = styled.div`
  margin-top: 15px;
  border: 1px solid black;
  padding: 1px 6px;
  border-radius: 20px;
  font-size: 0.6em;
`

const Items = styled.div`
  margin-top: 15px;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
`

const Item = styled.div`
  margin-right: 8px;
  cursor: pointer;
  font-weight: bold;
`
