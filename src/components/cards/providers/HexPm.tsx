import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiElixir } from 'react-icons/si';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const HexPmCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query);
  const lowerCase = normalizedQuery.toLowerCase();
  const names = [normalizedQuery];
  const moreNames = [`${lowerCase}-ex`];

  return (
    <Card title={t('providers.hexpm')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`hex.pm/packages/${name}`}
            service="existence"
            message="Go to Hex"
            link={`https://hex.pm/packages/${name}`}
            icon={<SiElixir />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default HexPmCard;
