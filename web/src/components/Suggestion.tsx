import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import fetch from 'isomorphic-unfetch';
import {TiArrowSync} from 'react-icons/ti';

import {capitalize, stem, germanify, njoin, lower, upper} from '../util/text';
import {sampleFromArray, fillArray} from '../util/array';
import {mobile} from '../util/css';
import {sanitize} from '../util/text';

type Modifier = (word: string) => string;

const maximumCount = 3;
const modifiers: Modifier[] = [
  (word): string => `${capitalize(germanify(word))}`,
  (word): string => `${capitalize(word)}`,
  (word): string => njoin('Air', capitalize(word), {elision: false}),
  (word): string => njoin('All', capitalize(word), {elision: false}),
  (word): string => njoin('Cloud', capitalize(word), {elision: false}),
  (word): string => njoin('Co', lower(word), {elision: false}),
  (word): string => njoin('Deep', capitalize(word), {elision: false}),
  (word): string => njoin('Easy', capitalize(word), {elision: false}),
  (word): string => njoin('Fast', lower(word), {elision: false}),
  (word): string => njoin('Fire', lower(word), {elision: false}),
  (word): string => njoin('Fusion', capitalize(word), {elision: false}),
  (word): string => njoin('Git', capitalize(word), {elision: false}),
  (word): string => njoin('Go', capitalize(word), {elision: false}),
  (word): string => njoin('Hyper', capitalize(word), {elision: false}),
  (word): string => njoin('In', capitalize(word), {elision: false}),
  (word): string => njoin('Infini', lower(word)),
  (word): string => njoin('Insta', lower(word), {elision: false}),
  (word): string => njoin('i', capitalize(word)),
  (word): string => njoin('Lead', lower(word), {elision: false}),
  (word): string => njoin('Less', lower(word)),
  (word): string => njoin('lib', lower(word), {elision: false}),
  (word): string => njoin('Many', lower(word)),
  (word): string => njoin('Max', upper(word), {elision: false}),
  (word): string => njoin('Micro', lower(word), {elision: false}),
  (word): string => njoin('mini', lower(word)),
  (word): string => njoin('Mono', lower(word)),
  (word): string => njoin('Meta', lower(word)),
  (word): string => njoin('nano', lower(word), {elision: false}),
  (word): string => njoin('Native', capitalize(word), {elision: false}),
  (word): string => njoin('Next', lower(word)),
  (word): string => njoin('No', upper(word), {elision: false}),
  (word): string => njoin('Octo', capitalize(word)),
  (word): string => njoin('Omni', capitalize(word), {elision: false}),
  (word): string => njoin('One', capitalize(word), {elision: false}),
  (word): string => njoin('Open', capitalize(word), {elision: false}),
  (word): string => njoin('Pro', capitalize(word), {elision: false}),
  (word): string => njoin('quick', lower(word), {elision: false}),
  (word): string => njoin('Semantic', capitalize(word), {elision: false}),
  (word): string => njoin('Smart', capitalize(word), {elision: false}),
  (word): string => njoin('Snap', capitalize(word), {elision: false}),
  (word): string => njoin('Super', lower(word), {elision: false}),
  (word): string => njoin('Ultra', lower(word), {elision: false}),
  (word): string => njoin('Un', lower(word), {elision: false}),
  (word): string => njoin('Uni', lower(word)),
  (word): string => njoin('Up', lower(word), {elision: false}),
  (word): string => njoin('Wunder', lower(germanify(word)), {elision: false}),
  (word): string => njoin('Zen', capitalize(word), {elision: false}),
  (word): string => njoin('Zero', capitalize(word), {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'able', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'al', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'el', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'em', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'en', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'er', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ery', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ia', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ible', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ics', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ifier', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ify', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ii', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'in', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'io', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ist', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ity', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ium', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'iverse', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'ory', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'um', {elision: false}),
  (word): string => njoin(capitalize(stem(word)), 'y'),
  (word): string => njoin(capitalize(word), 'AI', {elision: false}),
  (word): string => njoin(capitalize(word), 'API', {elision: false}),
  (word): string => njoin(capitalize(word), 'App'),
  (word): string => njoin(capitalize(word), 'base', {elision: false}),
  (word): string => njoin(capitalize(word), 'book', {elision: false}),
  (word): string => njoin(capitalize(word), 'Bot', {elision: false}),
  (word): string => njoin(capitalize(word), 'butler', {elision: false}),
  (word): string => njoin(capitalize(word), 'byte', {elision: false}),
  (word): string => njoin(capitalize(word), 'cast', {elision: false}),
  (word): string => njoin(capitalize(word), 'CDN', {elision: false}),
  (word): string => njoin(capitalize(word), 'CI', {elision: false}),
  (word): string => njoin(capitalize(word), 'Club', {elision: false}),
  (word): string => njoin(capitalize(word), 'DB', {elision: false}),
  (word): string => njoin(capitalize(word), 'Express', {elision: false}),
  (word): string => njoin(capitalize(word), 'feed', {elision: false}),
  (word): string => njoin(capitalize(word), 'Finder', {elision: false}),
  (word): string => njoin(capitalize(word), 'flow', {elision: false}),
  (word): string => njoin(capitalize(word), 'form', {elision: false}),
  (word): string => njoin(capitalize(word), 'ful'),
  (word): string => njoin(capitalize(word), 'Go', {elision: false}),
  (word): string => njoin(capitalize(word), 'gram', {elision: false}),
  (word): string => njoin(capitalize(word), 'Hero', {elision: false}),
  (word): string => njoin(capitalize(word), 'Hub', {elision: false}),
  (word): string => njoin(capitalize(word), 'Hunt', {elision: false}),
  (word): string => njoin(capitalize(word), 'IO', {elision: false}),
  (word): string => njoin(capitalize(word), 'It', {elision: false}),
  (word): string => njoin(capitalize(word), 'Kit', {elision: false}),
  (word): string => njoin(capitalize(word), 'Lab', {elision: false}),
  (word): string => njoin(capitalize(word), 'let'),
  (word): string => njoin(capitalize(word), 'less'),
  (word): string => njoin(capitalize(word), 'Link', {elision: false}),
  (word): string => njoin(capitalize(word), 'list', {elision: false}),
  (word): string => njoin(capitalize(word), 'list', {elision: false}),
  (word): string => njoin(capitalize(word), 'lit', {elision: false}),
  (word): string => njoin(capitalize(word), 'mind', {elision: false}),
  (word): string => njoin(capitalize(word), 'ML', {elision: false}),
  (word): string => njoin(capitalize(word), 'note', {elision: false}),
  (word): string => njoin(capitalize(word), 'Notes', {elision: false}),
  (word): string => njoin(capitalize(word), 'Pod', {elision: false}),
  (word): string => njoin(capitalize(word), 'Pro', {elision: false}),
  (word): string => njoin(capitalize(word), 'Scan', {elision: false}),
  (word): string => njoin(capitalize(word), 'shot'),
  (word): string => njoin(capitalize(word), 'space'),
  (word): string => njoin(capitalize(word), 'Stack', {elision: false}),
  (word): string => njoin(capitalize(word), 'Studio', {elision: false}),
  (word): string => njoin(capitalize(word), 'time'),
  (word): string => njoin(capitalize(word), 'way'),
  (word): string => njoin(capitalize(word), 'x', {elision: false}),
  (word): string => njoin(capitalize(word), 'check', {elision: false}),
  (word): string => njoin(capitalize(word), 'joy'),
  (word): string => njoin(lower(word), 'lint', {elision: false}),
  (word): string => njoin(lower(word), 'ly', {elision: false}),
];

function modifyWord(word: string): string {
  return modifiers[Math.floor(Math.random() * modifiers.length)](word);
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
    )
      .filter((word) => !/[\s-]/.exec(word))
      .map((word) => sanitize(word));
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
        synonymRef.current = [query, ...synonyms];
        shuffle();
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
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  ${mobile} {
    margin-top: 15px;
  }
`;

const Title = styled.div`
  padding: 0 10px;
  color: gray;
  border: 1px solid gray;
  border-radius: 2em;
  text-transform: uppercase;
  font-size: 12px;
  user-select: none;
`;

const Items = styled.div`
  margin: 5px 0;
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
  margin-top: 10px;
  margin: 10px 12px 0;
  cursor: pointer;
  font-weight: bold;
  font-family: inherit;
  font-size: 1.5rem;
  line-height: 1em;
  border-bottom: 1px dashed black;
  color: black;

  ${mobile} {
    margin: 10px 0 0;
    font-size: 1.3rem;
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
