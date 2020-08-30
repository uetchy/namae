import React from 'react';
import { useTranslation } from 'react-i18next';
import { NowIcon } from '../../Icons';

import { Card, Repeater, DedicatedAvailability } from '../core';

const VercelCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const sanitizedQuery = query
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .replace(/_/g, '-');
  const lowerCase = sanitizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.now')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.vercel.app`}
            service="existence"
            message={`Open ${name}.vercel.app`}
            link={`https://${name}.vercel.app`}
            icon={<NowIcon />}
          />
        )}
      </Repeater>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.now.sh`}
            service="existence"
            message={`Open ${name}.now.sh`}
            link={`https://${name}.now.sh`}
            icon={<NowIcon />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default VercelCard;
