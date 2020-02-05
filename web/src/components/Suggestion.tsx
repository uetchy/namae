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
  (word): string => `${capitalize(lower(word).replace('c', 'k'))}`,
  (word): string => `${capitalize(word)}`,
  (word): string => `${capitalize(word)}AI`,
  (word): string => `${capitalize(word)}API`,
  (word): string => `${capitalize(word)}base`,
  (word): string => `${capitalize(word)}book`,
  (word): string => `${capitalize(word)}Bot`,
  (word): string => `${capitalize(word)}butler`,
  (word): string => `${capitalize(word)}cast`,
  (word): string => `${capitalize(word)}Club`,
  (word): string => `${capitalize(word)}DB`,
  (word): string => `${capitalize(word)}er`,
  (word): string => `${capitalize(word)}ery`,
  (word): string => `${capitalize(word)}feed`,
  (word): string => `${capitalize(word)}Finder`,
  (word): string => `${capitalize(word)}flow`,
  (word): string => `${capitalize(word)}form`,
  (word): string => `${capitalize(word)}ful`,
  (word): string => `${capitalize(word)}Go`,
  (word): string => `${capitalize(word)}gram`,
  (word): string => `${capitalize(word)}Hero`,
  (word): string => `${capitalize(word)}Hub`,
  (word): string => `${capitalize(word)}Hunt`,
  (word): string => `${capitalize(word)}ia`,
  (word): string => `${capitalize(word)}ifier`,
  (word): string => `${capitalize(word)}ify`,
  (word): string => `${capitalize(word)}io`,
  (word): string => `${capitalize(word)}It`,
  (word): string => `${capitalize(word)}ium`,
  (word): string => `${capitalize(word)}Kit`,
  (word): string => `${capitalize(word)}Lab`,
  (word): string => `${capitalize(word)}let`,
  (word): string => `${capitalize(word)}Link`,
  (word): string => `${capitalize(word)}list`,
  (word): string => `${capitalize(word)}mind`,
  (word): string => `${capitalize(word)}note`,
  (word): string => `${capitalize(word)}Notes`,
  (word): string => `${capitalize(word)}Pod`,
  (word): string => `${capitalize(word)}Pro`,
  (word): string => `${capitalize(word)}Scan`,
  (word): string => `${capitalize(word)}shot`,
  (word): string => `${capitalize(word)}space`,
  (word): string => `${capitalize(word)}Stack`,
  (word): string => `${capitalize(word)}Studio`,
  (word): string => `${capitalize(word)}time`,
  (word): string => `${capitalize(word)}way`,
  (word): string => `${capitalize(word)}x`,
  (word): string => `${capitalize(word)}y`,
  (word): string => `${lower(word)}-io`,
  (word): string => `${lower(word)}check`,
  (word): string => `${lower(word)}joy`,
  (word): string => `${lower(word)}lint`,
  (word): string => `${lower(word)}ly`,
  (word): string => `Air${capitalize(word)}`,
  (word): string => `All${capitalize(word)}`,
  (word): string => `Cloud${capitalize(word)}`,
  (word): string => `Co${lower(word)}`,
  (word): string => `Deep${capitalize(word)}`,
  (word): string => `fast${lower(word)}`,
  (word): string => `Git${capitalize(word)}`,
  (word): string => `Go${capitalize(word)}`,
  (word): string => `Hyper${capitalize(word)}`,
  (word): string => `In${capitalize(word)}`,
  (word): string => `Insta${lower(word)}`,
  (word): string => `Lead${lower(word)}`,
  (word): string => `lib${lower(word)}`,
  (word): string => `Mani${lower(word)}`,
  (word): string => `Many${lower(word)}`,
  (word): string => `Micro${lower(word)}`,
  (word): string => `mini${lower(word)}`,
  (word): string => `Mono${lower(word)}`,
  (word): string => `nano${lower(word)}`,
  (word): string => `Next${lower(word)}`,
  (word): string => `No${lower(word)}`,
  (word): string => `Omni${capitalize(word)}`,
  (word): string => `One${capitalize(word)}`,
  (word): string => `Open${capitalize(word)}`,
  (word): string => `Pro${capitalize(word)}`,
  (word): string => `quick${lower(word)}`,
  (word): string => `Smart${capitalize(word)}`,
  (word): string => `super-${lower(word)}`,
  (word): string => `Uni${lower(word)}`,
  (word): string => `Up${lower(word)}`,
  (word): string => `Wunder${lower(word)}`,
  (word): string => `Zen${capitalize(word)}`,
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
    let isEffective = true;
    const fn = async (): Promise<void> => {
      if (query && query.length > 0) {
        const synonyms = await findSynonyms(query);
        if (!isEffective) {
          return;
        }
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
    return () => {
      isEffective = false;
    };
  }, [query]);

  return (
    <Container>
      <Title>{t('try')}</Title>
      <Items>
        {bestWords &&
          bestWords.map((name, i) => (
            <Item key={name + i} onClick={(): void => applyQuery(name)}>
              {name}
            </Item>
          ))}
      </Items>
      <Icon onClick={shuffle}>
        <TiArrowSync />
      </Icon>
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
  padding: 5px 14px;
  color: gray;
  border: 1px solid gray;
  border-radius: 2em;
  font-size: 0.6rem;
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
  font-size: 1.2rem;
  border-bottom: 1px dashed black;
  color: black;

  ${mobile} {
    margin-right: 0;
    font-size: 1.1rem;
  }
`;

const Icon = styled(Item)`
  margin: 15px 0 0 0;
  padding: 8px 9px;
  display: flex;
  align-items: center;
  border-bottom: none;
  color: white;
  border-radius: 4px;
  font-size: 1.3rem;
  user-select: none;
  background: #5610ff;
  transition: background 0.1s ease-out;

  &:hover {
    background: #723df3;
  }

  &:active {
    background: #a17ff5;
  }
`;
