import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFly } from 'react-icons/fa';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const FlyIoCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();
  const names = [lowerCase];

  return (
    <Card title={t('providers.fly')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.fly.dev`}
            service="dns"
            message={`Go to ${name}.fly.dev`}
            link={`https://${name}.fly.dev`}
            icon={<FaFly />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default FlyIoCard;
