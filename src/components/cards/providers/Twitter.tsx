import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTwitter } from 'react-icons/fa';

import { capitalize, normalize } from '../../../util/text';
import { Card, Repeater, DedicatedAvailability } from '../core';

const TwitterCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const normalizedQuery = normalize(query, { allowHyphens: false });
  const lowerCase = normalizedQuery.toLowerCase();
  const capitalCase = capitalize(normalizedQuery);

  const names = [
    normalizedQuery,
    `${capitalCase}App`,
    `${lowerCase}_team`,
    `${capitalCase}HQ`,
    `hey${lowerCase}`,
  ];
  const moreNames = [
    `${lowerCase}_support`,
    `${lowerCase}_org`,
    `${lowerCase}_app`,
    `${capitalCase}JS`,
  ];

  return (
    <Card title={t('providers.twitter')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={name}
            service="twitter"
            message={`Go to twitter.com/${name}`}
            link={`https://twitter.com/${name}`}
            icon={<FaTwitter />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default TwitterCard;
