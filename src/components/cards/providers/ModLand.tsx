import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiDeno } from 'react-icons/si';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const ModLandCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();
  const names = [lowerCase];

  return (
    <Card title={t('providers.modland')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.mod.land`}
            service="existence"
            message="Go to mod.land repository"
            link="https://github.com/denosaurs/mod.land"
            messageIfTaken={`Go to ${name}.mod.land`}
            linkIfTaken={`https://${name}.mod.land`}
            icon={<SiDeno />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default ModLandCard;
