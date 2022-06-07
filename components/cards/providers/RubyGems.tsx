import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiRubygems } from 'react-icons/si';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const RubyGemsCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query);
  const lowerCase = normalizedQuery.toLowerCase();
  const names = [normalizedQuery];
  const moreNames = [`${lowerCase}-rb`];

  return (
    <Card title={t('providers.rubygems')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`rubygems.org/gems/${name}`}
            service="existence"
            message="Go to RubyGems"
            link={`https://rubygems.org/gems/${name}`}
            icon={<SiRubygems />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default RubyGemsCard;
