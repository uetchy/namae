import React from 'react';
import { useTranslation } from 'react-i18next';
import { normalize } from '../../../util/text';
import { NowIcon } from '../../Icons';

import { Card, Repeater, DedicatedAvailability } from '../core';

const VercelCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.now')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.vercel.app`}
            service="existence"
            message={`Go to ${name}.vercel.app`}
            link={`https://${name}.vercel.app`}
            icon={<NowIcon />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default VercelCard;
