import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaAws } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, DedicatedAvailability, Repeater } from '../core';

const S3Card: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.s3')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`${name}.s3.amazonaws.com`}
            service="existence"
            message={`Go to ${name}.s3.amazonaws.com`}
            link={`https://${name}.s3.amazonaws.com`}
            suffix=".s3.amazonaws.com"
            icon={<FaAws />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default S3Card;
