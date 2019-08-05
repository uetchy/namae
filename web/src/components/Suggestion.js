import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import fetch from 'isomorphic-unfetch'

import { capitalize } from '../util/text'

const modifiers = [
  (word) => `${capitalize(word)}ify`,
  (word) => `lib${lower(word)}`,
  (word) => `Omni${capitalize(word)}`,
  (word) => `${capitalize(word)}Lab`,
  (word) => `${capitalize(word)}Kit`,
  (word) => `Open${capitalize(word)}`,
  (word) => `${capitalize(word)}box`,
  (word) => `Insta${lower(word)}`,
  (word) => `${capitalize(word)}Hub`,
  (word) => `Cloud${capitalize(word)}`,
  (word) => `quick${lower(word)}`,
  (word) => `fast${lower(word)}`,
  (word) => `super-${lower(word)}`,
  (word) => `Hyper${capitalize(word)}`,
  (word) => `${capitalize(word)}Go`,
  (word) => `${lower(word)}-io`,
  (word) => `Go${capitalize(word)}`,
  (word) => `${capitalize(word)}X`,
  (word) => `${capitalize(word)}time`,
  (word) => `${capitalize(word)}flow`,
  (word) => `${capitalize(word)}ful`,
  (word) => `${capitalize(word)}ery`,
  (word) => `${lower(word)}ly`,
  (word) => `${lower(word)}joy`,
  (word) => `${capitalize(word)}Hunt`,
  (word) => `${capitalize(word)}gram`,
  (word) => `${capitalize(word)}base`,
  (word) => `${capitalize(word)}API`,
  (word) => `${capitalize(word)}note`,
  (word) => `In${capitalize(word)}`,
  (word) => `Uni${lower(word)}`,
  (word) => `${capitalize(word)}`,
]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function modifyWord(word) {
  return modifiers[Math.floor(Math.random() * modifiers.length)](word)
}

function lower(word) {
  return word.toLowerCase()
}

async function findSynonyms(word, maximum = 10) {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=ss&ie=UTF-8&oe=UTF-8&dj=1&q=${encodeURIComponent(
        word
      )}`
    )
    const json = await response.json()
    const synonyms = json.synsets.reduce(
      (sum, synset) =>
        (sum = [...sum, ...synset.entry.map((e) => e.synonym[0])]),
      []
    )
    let bestWords = [
      ...new Set(
        shuffleArray(synonyms.filter((word) => !word.match(/[\s-]/))).slice(
          0,
          maximum
        )
      ),
    ]
    const deficit = maximum - bestWords.length
    if (deficit > 0) {
      bestWords = [...bestWords, ...Array(deficit).fill(word)]
    }
    return bestWords
  } catch (err) {
    return Array(maximum).fill(word)
  }
}

export default function Suggestion({ query, onSubmit }) {
  const { t } = useTranslation()
  const [synonyms, setSynonyms] = useState([])

  useEffect(() => {
    const fn = async () => {
      if (query && query.length > 0) {
        const synonyms = (await findSynonyms(query, 3)).map((synonym) =>
          modifyWord(synonym)
        )
        setSynonyms(synonyms)
      }
    }
    fn()
  }, [query])

  function applyQuery(name) {
    onSubmit(name)
  }

  return (
    <Container>
      <Title>{t('try')}</Title>
      <Items>
        {synonyms &&
          synonyms.map((name) => (
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
  align-items: baseline;
  line-height: 1em;
`

const Title = styled.div`
  margin-top: 15px;
  font-size: 0.6em;
`

const Items = styled.div`
  margin-top: 15px;
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const Item = styled.div`
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  font-family: monospace;
  border-bottom: 1px dashed black;
`
