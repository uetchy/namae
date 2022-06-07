import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiRust } from 'react-icons/si';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const CratesioCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query);
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.rust')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`crates.io/api/v1/crates/${name}`}
            service="existence"
            link={`https://crates.io/crates/${name}`}
            message="Go to crates.io"
            icon={<SiRust />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default CratesioCard;
