import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReddit } from 'react-icons/fa';

import { Card, Repeater, DedicatedAvailability } from '../core';

const SubredditCard: React.FC<{ query: string }> = ({ name }) => {
  const { t } = useTranslation();
  const lowerCase = name.toLowerCase();

  const names = [name];
  const moreNames = [
    `get${lowerCase}`,
    `${lowerCase}-team`,
  ];

  return (
    <Card title={t('providers.reddit')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="reddit" // route to http://namae.dev/api/services/reddit/<query> which is /api/services/reddit/[query].ts on GitHub
            link={`https://reddit.com/r/${name}`}
            prefix="reddit.com/r/"
            icon={<FaReddit />}
          />
        )}
      </Repeater>
    </Card>
  );
};