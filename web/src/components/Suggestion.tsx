import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import fetch from 'isomorphic-unfetch';
import {TiArrowSync} from 'react-icons/ti';

import {capitalize, stem, germanify, njoin, lower, upper} from '../util/text';
import {sampleFromArray, fillArray} from '../util/array';
import {mobile} from '../util/css';

type Modifier = (word: string) => string;

const maximumCount = 3;
const modifiers: Modifier[] = [
  (word): string => `${capitalize(germanify(word))}`,
  (word): string => `${capitalize(stem(word))}able`,
  (word): string => `${capitalize(stem(word))}al`,
  (word): string => `${capitalize(stem(word))}el`,
  (word): string => `${capitalize(stem(word))}em`,
  (word): string => `${capitalize(stem(word))}en`,
  (word): string => `${capitalize(stem(word))}er`,
  (word): string => `${capitalize(stem(word))}ery`,
  (word): string => `${capitalize(stem(word))}ia`,
  (word): string => `${capitalize(stem(word))}ible`,
  (word): string => `${capitalize(stem(word))}ics`,
  (word): string => `${capitalize(stem(word))}ifier`,
  (word): string => `${capitalize(stem(word))}ify`,
  (word): string => `${capitalize(stem(word))}ii`,
  (word): string => `${capitalize(stem(word))}ist`,
  (word): string => `${capitalize(stem(word))}in`,
  (word): string => `${capitalize(stem(word))}io`,
  (word): string => `${capitalize(stem(word))}iverse`,
  (word): string => `${capitalize(stem(word))}ium`,
  (word): string => `${capitalize(stem(word))}um`,
  (word): string => `${capitalize(stem(word))}ory`,
  (word): string => njoin(capitalize(stem(word)), 'y'),
  (word): string => `${capitalize(word)}`,
  (word): string => `${capitalize(word)}AI`,
  (word): string => `${capitalize(word)}API`,
  (word): string => `${capitalize(word)}base`,
  (word): string => `${capitalize(word)}book`,
  (word): string => `${capitalize(word)}Bot`,
  (word): string => `${capitalize(word)}butler`,
  (word): string => `${capitalize(word)}cast`,
  (word): string => `${capitalize(word)}CDN`,
  (word): string => `${capitalize(word)}Club`,
  (word): string => `${capitalize(word)}DB`,
  (word): string => `${capitalize(word)}feed`,
  (word): string => `${capitalize(word)}Finder`,
  (word): string => `${capitalize(word)}flow`,
  (word): string => `${capitalize(word)}form`,
  (word): string => njoin(capitalize(word), 'ful'),
  (word): string => `${capitalize(word)}Go`,
  (word): string => `${capitalize(word)}gram`,
  (word): string => `${capitalize(word)}Hero`,
  (word): string => `${capitalize(word)}Hub`,
  (word): string => `${capitalize(word)}Hunt`,
  (word): string => `${capitalize(word)}It`,
  (word): string => `${capitalize(word)}Kit`,
  (word): string => `${capitalize(word)}Lab`,
  (word): string => njoin(capitalize(word), 'let'),
  (word): string => `${capitalize(word)}Link`,
  (word): string => `${capitalize(word)}list`,
  (word): string => `${capitalize(word)}mind`,
  (word): string => njoin(capitalize(word), 'note'),
  (word): string => `${capitalize(word)}Notes`,
  (word): string => `${capitalize(word)}Pod`,
  (word): string => `${capitalize(word)}Pro`,
  (word): string => `${capitalize(word)}Scan`,
  (word): string => njoin(capitalize(word), 'shot'),
  (word): string => njoin(capitalize(word), 'space'),
  (word): string => `${capitalize(word)}Stack`,
  (word): string => `${capitalize(word)}Studio`,
  (word): string => njoin(capitalize(word), 'time'),
  (word): string => njoin(capitalize(word), 'way'),
  (word): string => `${capitalize(word)}x`,
  (word): string => `${lower(word)}-IO`,
  (word): string => `${lower(word)}check`,
  (word): string => `${lower(word)}lint`,
  (word): string => `${lower(word)}ly`,
  (word): string => `Air${capitalize(word)}`,
  (word): string => `All${capitalize(word)}`,
  (word): string => `Cloud${capitalize(word)}`,
  (word): string => `Co${lower(word)}`,
  (word): string => `Deep${capitalize(word)}`,
  (word): string => `Easy${capitalize(word)}`,
  (word): string => `Fast${lower(word)}`,
  (word): string => `Fusion${capitalize(word)}`,
  (word): string => `Git${capitalize(word)}`,
  (word): string => `Go${capitalize(word)}`,
  (word): string => `Hyper${capitalize(word)}`,
  (word): string => `In${capitalize(word)}`,
  (word): string => `Insta${lower(word)}`,
  (word): string => `Lead${lower(word)}`,
  (word): string => `lib${lower(word)}`,
  (word): string => `Max${upper(word)}`,
  (word): string => `Micro${lower(word)}`,
  (word): string => `Native${capitalize(word)}`,
  (word): string => `nano${lower(word)}`,
  (word): string => `No${upper(word)}`,
  (word): string => `Omni${capitalize(word)}`,
  (word): string => `One${capitalize(word)}`,
  (word): string => `Open${capitalize(word)}`,
  (word): string => njoin('Octo', capitalize(word)),
  (word): string => `Pro${capitalize(word)}`,
  (word): string => `quick${lower(word)}`,
  (word): string => `Smart${capitalize(word)}`,
  (word): string => `Snap${capitalize(word)}`,
  (word): string => `Super${lower(word)}`,
  (word): string => `Semantic${capitalize(word)}`,
  (word): string => `Up${lower(word)}`,
  (word): string => `Un${lower(word)}`,
  (word): string => `Wunder${lower(germanify(word))}`,
  (word): string => `Zen${capitalize(word)}`,
  (word): string => njoin('Many', lower(word)),
  (word): string => njoin('mini', lower(word)),
  (word): string => njoin('Mono', lower(word)),
  (word): string => njoin('Next', lower(word)),
  (word): string => njoin('Uni', lower(word)),
  (word): string => njoin(lower(word), 'joy'),
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
  margin-top: 20px;
  padding: 3px 10px;
  color: gray;
  border: 1px solid gray;
  border-radius: 2em;
  text-transform: uppercase;
  font-size: 12px;
  user-select: none;
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
  font-size: 1.5rem;
  border-bottom: 1px dashed black;
  color: black;

  ${mobile} {
    margin-right: 0;
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
