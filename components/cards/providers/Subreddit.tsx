import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaReddit } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const SubredditCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    allowUnderscore: true,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [normalizedQuery];
  const moreNames = [`get${lowerCase}`, `${lowerCase}_team`];

  return (
    <Card title={t('providers.reddit')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="reddit" // route to http://namae.dev/api/services/reddit/<query> which is /api/services/reddit/[query].ts on GitHub
            message={`Go to reddit.com/r/${name}`}
            link={`https://reddit.com/r/${name}`}
            prefix="reddit.com/r/"
            icon={<FaReddit />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default SubredditCard;
