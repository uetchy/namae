import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaYoutube } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const YouTubeCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    alphanumeric: false,
    allowUnderscore: false,
    allowHyphens: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [normalizedQuery];
  const moreNames = [`${lowerCase}app`, `${lowerCase}team`, `${lowerCase}hq`];

  return (
    <Card title={t('providers.youtube')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={`youtube.com/@${name}`}
            service="existence"
            message={`Go to youtube.com/@${name}`}
            link={`https://www.youtube.com/@${name}`}
            icon={<FaYoutube />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default YouTubeCard;
