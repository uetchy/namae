import React from 'react';
import { useTranslation } from 'react-i18next';
import { NetlifyIcon } from '../../Icons';

import { Card, Repeater, DedicatedAvailability } from '../core';

const NetlifyCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const sanitizedQuery = query
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .replace(/_/g, '-');
  const lowerCase = sanitizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.netlify')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.netlify.com`}
            service="existence"
            message={`Open ${name}.netlify.com`}
            link={`https://${name}.netlify.com`}
            icon={<NetlifyIcon />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default NetlifyCard;
