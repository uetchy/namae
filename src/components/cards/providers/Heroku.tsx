import React from 'react';
import { useTranslation } from 'react-i18next';
import { DiHeroku } from 'react-icons/di';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const HerokuCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.heroku')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.herokuapp.com`}
            service="existence"
            message="Go to Heroku"
            link={`https://${name}.herokuapp.com`}
            icon={<DiHeroku />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default HerokuCard;
