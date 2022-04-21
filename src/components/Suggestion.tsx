import fetch from 'cross-fetch';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TiArrowSync } from 'react-icons/ti';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';
import {
  sendAcceptSuggestionEvent,
  sendShuffleSuggestionEvent,
} from '../util/analytics';
import { sample, sampleMany, times } from '../util/array';
import { mobile, slideUp } from '../util/css';
import {
  capitalize,
  germanify,
  lower,
  njoin,
  sanitize,
  stem,
  upper,
} from '../util/text';

type Modifier = (word: string) => string;

const MODIFIERS: Modifier[] = [
  (word): string => `${capitalize(germanify(word))}`,
  (word): string => `${capitalize(word)}`,
  (word): string => njoin('Air', capitalize(word), { elision: false }),
  (word): string => njoin('All', capitalize(word), { elision: false }),
  (word): string => njoin('Cloud', capitalize(word), { elision: false }),
  (word): string => njoin('Co', lower(word), { elision: false }),
  (word): string => njoin('Deep', capitalize(word), { elision: false }),
  (word): string => njoin('Easy', capitalize(word), { elision: false }),
  (word): string => njoin('En', lower(word), { elision: false }),
  (word): string => njoin('Fast', lower(word), { elision: false }),
  (word): string => njoin('Fire', lower(word), { elision: false }),
  (word): string => njoin('Fusion', capitalize(word), { elision: false }),
  (word): string => njoin('Git', capitalize(word), { elision: false }),
  (word): string => njoin('Go', capitalize(word)),
  (word): string => njoin('Hyper', capitalize(word)),
  (word): string => njoin('In', capitalize(word), { elision: false }),
  (word): string => njoin('Infini', lower(word)),
  (word): string => njoin('Insta', lower(word)),
  (word): string => njoin('i', capitalize(word)),
  (word): string => njoin('Lead', lower(word)),
  (word): string => njoin('Less', lower(word)),
  (word): string => njoin('lib', lower(word)),
  (word): string => njoin('Many', lower(word)),
  (word): string => njoin('Max', capitalize(word)),
  (word): string => njoin('Micro', lower(word)),
  (word): string => njoin('mini', lower(word)),
  (word): string => njoin('Mono', lower(word)),
  (word): string => njoin('Meta', lower(word)),
  (word): string => njoin('nano', lower(word)),
  (word): string => njoin('Native', capitalize(word), { elision: false }),
  (word): string => njoin('Next', lower(word)),
  (word): string => njoin('No', upper(word), { elision: false }),
  (word): string => njoin('Octo', lower(word)),
  (word): string => njoin('Omni', capitalize(word), { elision: false }),
  (word): string => njoin('One', capitalize(word), { elision: false }),
  (word): string => njoin('Open', capitalize(word), { elision: false }),
  (word): string => njoin('Pro', capitalize(word), { elision: false }),
  (word): string => njoin('Quick', lower(word)),
  (word): string => njoin('Semantic', capitalize(word), { elision: false }),
  (word): string => njoin('Smart', lower(word)),
  (word): string => njoin('Snap', capitalize(word), { elision: false }),
  (word): string => njoin('Super', lower(word), { elision: false }),
  (word): string => njoin('Strong', lower(word)),
  (word): string => njoin('Ultra', lower(word)),
  (word): string => njoin('Un', lower(word), { elision: false }),
  (word): string => njoin('Uni', lower(word)),
  (word): string => njoin('unified', lower(word)),
  (word): string => njoin('Up', lower(word), { elision: false }),
  (word): string => njoin('Wunder', lower(germanify(word)), { elision: false }),
  (word): string => njoin('Zen', capitalize(word), { elision: false }),
  (word): string => njoin('Zero', capitalize(word), { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'able', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'al', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'el', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'em', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'en', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'er', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ery', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ia', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ible', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ics', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ifier', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ify', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ii', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'in', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'io', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ist', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ity', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ium', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'iverse', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'ory', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'um', { elision: false }),
  (word): string => njoin(capitalize(stem(word)), 'y'),
  (word): string => njoin(capitalize(word), 'AI', { elision: false }),
  (word): string => njoin(capitalize(word), 'API', { elision: false }),
  (word): string => njoin(capitalize(word), 'App'),
  (word): string => njoin(capitalize(word), 'base'),
  (word): string => njoin(capitalize(word), 'book', { elision: false }),
  (word): string => njoin(capitalize(word), 'Bot', { elision: false }),
  (word): string => njoin(capitalize(word), 'butler'),
  (word): string => njoin(capitalize(word), 'byte'),
  (word): string => njoin(capitalize(word), 'cast'),
  (word): string => njoin(capitalize(word), 'CDN', { elision: false }),
  (word): string => njoin(capitalize(word), 'CI', { elision: false }),
  (word): string => njoin(capitalize(word), 'Club', { elision: false }),
  (word): string => njoin(capitalize(word), 'DB', { elision: false }),
  (word): string => njoin(capitalize(word), 'Express', { elision: false }),
  (word): string => njoin(capitalize(word), 'en'),
  (word): string => njoin(capitalize(word), 'feed'),
  (word): string => njoin(capitalize(word), 'Finder', { elision: false }),
  (word): string => njoin(capitalize(word), 'flow'),
  (word): string => njoin(capitalize(word), 'form'),
  (word): string => njoin(capitalize(word), 'ful'),
  (word): string => njoin(capitalize(word), 'Go', { elision: false }),
  (word): string => njoin(capitalize(word), 'gram'),
  (word): string => njoin(capitalize(word), 'Hero', { elision: false }),
  (word): string => njoin(capitalize(word), 'Hub', { elision: false }),
  (word): string => njoin(capitalize(word), 'Hunt', { elision: false }),
  (word): string => njoin(capitalize(word), '.IO', { elision: false }),
  (word): string => njoin(capitalize(word), 'It', { elision: false }),
  (word): string => njoin(capitalize(word), 'Kit', { elision: false }),
  (word): string => njoin(capitalize(word), 'Lab', { elision: false }),
  (word): string => njoin(capitalize(word), 'let'),
  (word): string => njoin(capitalize(word), 'less'),
  (word): string => njoin(capitalize(word), 'Link', { elision: false }),
  (word): string => njoin(capitalize(word), 'list', { elision: false }),
  (word): string => njoin(capitalize(word), 'list', { elision: false }),
  (word): string => njoin(capitalize(word), 'lit', { elision: false }),
  (word): string => njoin(capitalize(word), 'mind', { elision: false }),
  (word): string => njoin(capitalize(word), 'ML', { elision: false }),
  (word): string => njoin(capitalize(word), 'note', { elision: false }),
  (word): string => njoin(capitalize(word), 'Notes', { elision: false }),
  (word): string => njoin(capitalize(word), 'Pod', { elision: false }),
  (word): string => njoin(capitalize(word), 'Pro', { elision: false }),
  (word): string => njoin(capitalize(word), 'Scan', { elision: false }),
  (word): string => njoin(capitalize(word), 'shot'),
  (word): string => njoin(capitalize(word), 'space'),
  (word): string => njoin(capitalize(word), 'Stack', { elision: false }),
  (word): string => njoin(capitalize(word), 'Studio', { elision: false }),
  (word): string => njoin(capitalize(word), 'Sensei', { elision: false }),
  (word): string => njoin(capitalize(word), 'time'),
  (word): string => njoin(capitalize(word), 'way'),
  (word): string => njoin(capitalize(word), 'x', { elision: false }),
  (word): string => njoin(capitalize(word), 'check', { elision: false }),
  (word): string => njoin(capitalize(word), 'joy'),
  (word): string => njoin(lower(word), 'lint', { elision: false }),
  (word): string => njoin(lower(word), 'ly', { elision: false }),
  (word): string => njoin(capitalize(word), 'mate'),
  (word): string => capitalize(word) + ' by Design',
];

const FONT_FAMILIES = [
  `'Helvetica', sans-serif`,
  `'Avenir', sans-serif`,
  `'Futura', sans-serif`,
  `'Montserrat', sans-serif`,
];

const FONT_WEIGHTS = [300, 600, 900];

const NUM_SUGGESTION = 3;

function modifyWord(word: string): string {
  return sample(MODIFIERS)(word);
}

async function getSynonyms(word: string): Promise<string[]> {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&dt=ss&ie=UTF-8&oe=UTF-8&dj=1&q=${encodeURIComponent(
        word
      )}`
    );
    const json: {
      synsets: Array<{ entry: Array<{ synonym: string[] }> }>;
    } = await response.json();
    const synonyms = Array.from(
      new Set<string>(
        json.synsets.reduce(
          (sum, synset) => [...sum, ...synset.entry.map((e) => e.synonym[0])],
          [] as string[]
        )
      )
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
}> = ({ query, onSubmit }) => {
  const { t } = useTranslation();
  const synonymRef = useRef<string[]>([]);
  const [bestWords, setBestWords] = useState<string[]>([]);

  function shuffle(): void {
    const best = sampleMany(
      [...synonymRef.current.filter((s) => s.length < 8), ...times(query, 10)],
      NUM_SUGGESTION
    ).map((word) => modifyWord(word));
    setBestWords(best);
  }

  function applyQuery(name: string): void {
    onSubmit(name);
    sendAcceptSuggestionEvent();
  }

  function onShuffleButtonClicked() {
    shuffle();
    sendShuffleSuggestionEvent();
  }

  useEffect(() => {
    let isEffective = true;

    const fn = async (): Promise<void> => {
      if (query && query.length > 0) {
        const synonyms = await getSynonyms(query);
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
    // eslint-disable-next-line
  }, [query]);

  return (
    <Container>
      <Title>{t('try')}</Title>

      {bestWords.length > 0 ? (
        <Items>
          {bestWords.map((name, i) => (
            <Item
              style={{
                fontFamily: sample(FONT_FAMILIES),
                fontWeight: sample(FONT_WEIGHTS),
              }}
              key={name + i}
              onClick={(): void => applyQuery(name)}
              delay={i + 1}
            >
              <span>{name}</span>
            </Item>
          ))}{' '}
        </Items>
      ) : (
        <div
          style={{
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <PropagateLoader size={10} />
        </div>
      )}

      <Button onClick={onShuffleButtonClicked}>
        <TiArrowSync />
      </Button>
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

const Item = styled.div<{ delay: number }>`
  margin: 10px 15px 0;
  padding-bottom: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.7rem;
  /* letter-spacing: -0.5px; */
  border-bottom: 1px dashed black;
  color: black;
  overflow: hidden;

  span {
    display: block;
    animation: 0.6s cubic-bezier(0.19, 1, 0.22, 1)
      ${(props) => `${props.delay * 0.1}s`} 1 normal both running ${slideUp};
  }

  ${mobile} {
    margin: 5px 0 0;
    padding-bottom: 0;
    font-size: 1rem;
  }
`;

const Button = styled(motion.div).attrs({
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
})`
  margin: 15px 0 0 0;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  border-bottom: none;
  color: white;
  border-radius: 4px;
  font-size: 1.3rem;
  user-select: none;
  background: #5610ff;
  transition: background 0.1s ease-out;
  cursor: pointer;

  &:hover {
    background: #723df3;
  }

  &:active {
    background: #a17ff5;
  }
`;
