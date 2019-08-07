import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import fetch from 'isomorphic-unfetch'
import { TiArrowSync } from 'react-icons/ti'

import { capitalize } from '../util/text'
import { mobile } from '../util/css'

const maximumCount = 3
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

function lower(word) {
  return word.toLowerCase()
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function sampleFromArray(array, maximum) {
  return shuffleArray(array).slice(0, maximum)
}

function modifyWord(word) {
  return modifiers[Math.floor(Math.random() * modifiers.length)](word)
}

function fillArray(array, filler, maximum) {
  const deficit = maximum - array.length
  if (deficit > 0) {
    array = [...array, ...Array(deficit).fill(filler)]
  }
  return array
}

async function findSynonyms(word) {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=ss&ie=UTF-8&oe=UTF-8&dj=1&q=${encodeURIComponent(
        word
      )}`
    )
    const json = await response.json()
    const synonyms = [
      ...new Set(
        json.synsets.reduce(
          (sum, synset) =>
            (sum = [...sum, ...synset.entry.map((e) => e.synonym[0])]),
          []
        )
      ),
    ].filter((word) => !word.match(/[\s-]/))
    return synonyms
  } catch (err) {
    return []
  }
}

export default function Suggestion({ query, onSubmit }) {
  const { t } = useTranslation()
  const synonymRef = useRef([])
  const [bestWords, setBestWords] = useState([])

  function shuffle() {
    const best = fillArray(
      sampleFromArray(synonymRef.current, maximumCount),
      query,
      maximumCount
    ).map((word) => modifyWord(word))
    setBestWords(best)
  }

  function applyQuery(name) {
    onSubmit(name)
  }

  useEffect(() => {
    const fn = async () => {
      if (query && query.length > 0) {
        const synonyms = await findSynonyms(query)
        synonymRef.current = synonyms
        const best = fillArray(
          sampleFromArray(synonyms, maximumCount),
          query,
          maximumCount
        ).map((word) => modifyWord(word))
        setBestWords(best)
      }
    }
    fn()
  }, [query])

  return (
    <Container>
      <Title>{t('try')}</Title>
      <Items>
        {bestWords &&
          bestWords.map((name) => (
            <Item key={name} onClick={() => applyQuery(name)}>
              {name}
            </Item>
          ))}
        <Icon>
          <TiArrowSync onClick={shuffle} />
        </Icon>
      </Items>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

const Title = styled.div`
  margin-top: 15px;
  padding: 5px 12px;
  color: gray;
  border: 1px solid gray;
  border-radius: 2em;
`

const Items = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  ${mobile} {
    flex-direction: column;
    align-items: center;
  }
`

const Item = styled.div`
  margin-top: 8px;
  margin-right: 14px;
  cursor: pointer;
  font-weight: bold;
  font-family: monospace;
  border-bottom: 1px dashed black;
  color: black;

  ${mobile} {
    margin-right: 0;
  }
`

const Icon = styled(Item)`
  display: flex;
  align-items: center;
  border-bottom: none;
`
