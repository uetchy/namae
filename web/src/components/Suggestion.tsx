import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import fetch from 'isomorphic-unfetch';
import {TiArrowSync} from 'react-icons/ti';

import {capitalize} from '../util/text';
import {mobile} from '../util/css';

type Modifier = (word: string) => string;

function lower(word: string): string {
  return word.toLowerCase();
}

const maximumCount = 3;
const modifiers: Modifier[] = [
  (word): string => `${capitalize(word)}ify`,
  (word): string => `lib${lower(word)}`,
  (word): string => `Omni${capitalize(word)}`,
  (word): string => `${capitalize(word)}Lab`,
  (word): string => `${capitalize(word)}Kit`,
  (word): string => `Open${capitalize(word)}`,
  (word): string => `${capitalize(word)}box`,
  (word): string => `Insta${lower(word)}`,
  (word): string => `${capitalize(word)}Hub`,
  (word): string => `Cloud${capitalize(word)}`,
  (word): string => `quick${lower(word)}`,
  (word): string => `fast${lower(word)}`,
  (word): string => `super-${lower(word)}`,
  (word): string => `Hyper${capitalize(word)}`,
  (word): string => `${capitalize(word)}Go`,
  (word): string => `${lower(word)}-io`,
  (word): string => `Go${capitalize(word)}`,
  (word): string => `${capitalize(word)}X`,
  (word): string => `${capitalize(word)}time`,
  (word): string => `${capitalize(word)}flow`,
  (word): string => `${capitalize(word)}ful`,
  (word): string => `${capitalize(word)}ery`,
  (word): string => `${lower(word)}ly`,
  (word): string => `${lower(word)}joy`,
  (word): string => `${capitalize(word)}Hunt`,
  (word): string => `${capitalize(word)}gram`,
  (word): string => `${capitalize(word)}base`,
  (word): string => `${capitalize(word)}API`,
  (word): string => `${capitalize(word)}note`,
  (word): string => `In${capitalize(word)}`,
  (word): string => `Uni${lower(word)}`,
  (word): string => `${capitalize(word)}`,
];

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function sampleFromArray<T>(array: T[], maximum: number): T[] {
  return shuffleArray(array).slice(0, maximum);
}

function modifyWord(word: string): string {
  return modifiers[Math.floor(Math.random() * modifiers.length)](word);
}

function fillArray<T>(array: T[], filler: string, maximum: number): T[] {
  const deficit = maximum - array.length;
  if (deficit > 0) {
    array = [...array, ...Array(deficit).fill(filler)];
  }
  return array;
}

async function findSynonyms(word: string): Promise<string[]> {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=ss&ie=UTF-8&oe=UTF-8&dj=1&q=${encodeURIComponent(
        word,
      )}`,
    );
    const json: {
      synsets: Array<{entry: Array<{synonym: string[]}>}>;
    } = await response.json();
    const synonyms = Array.from(
      new Set<string>(
        json.synsets.reduce(
          (sum, synset) => [...sum, ...synset.entry.map((e) => e.synonym[0])],
          [] as string[],
        ),
      ),
    ).filter((word) => !/[\s-]/.exec(word));
    return synonyms;
  } catch (err) {
    return [];
  }
}

const Suggestion: React.FC<{
  query: string;
  onSubmit: (name: string) => void;
}> = ({query, onSubmit}) => {
  const {t} = useTranslation();
  const synonymRef = useRef<string[]>([]);
  const [bestWords, setBestWords] = useState<string[]>([]);

  function shuffle(): void {
    const best = fillArray(
      sampleFromArray(synonymRef.current, maximumCount),
      query,
      maximumCount,
    ).map((word) => modifyWord(word));
    setBestWords(best);
  }

  function applyQuery(name: string): void {
    onSubmit(name);
  }

  useEffect(() => {
    const fn = async (): Promise<void> => {
      if (query && query.length > 0) {
        const synonyms = await findSynonyms(query);
        synonymRef.current = synonyms;
        const best = fillArray(
          sampleFromArray(synonyms, maximumCount),
          query,
          maximumCount,
        ).map((word) => modifyWord(word));
        setBestWords(best);
      }
    };
    fn();
  }, [query]);

  return (
    <Container>
      <Title>{t('try')}</Title>
      <Items>
        {bestWords &&
          bestWords.map((name) => (
            <Item key={name} onClick={(): void => applyQuery(name)}>
              {name}
            </Item>
          ))}
        <Icon>
          <TiArrowSync onClick={shuffle} />
        </Icon>
      </Items>
    </Container>
  );
};

export default Suggestion;

const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 15px;
  padding: 5px 12px;
  color: gray;
  border: 1px solid gray;
  border-radius: 2em;
`;

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
`;

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
`;

const Icon = styled(Item)`
  display: flex;
  align-items: center;
  border-bottom: none;
`;
