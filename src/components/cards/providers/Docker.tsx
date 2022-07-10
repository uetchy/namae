import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDocker } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, DedicatedAvailability, Repeater } from '../core';

const DockerCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, { allowUnderscore: false });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.docker')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`hub.docker.com/v2/orgs/${name}`}
            service="existence"
            message="Go to Docker Hub"
            link={`https://hub.docker.com/orgs/${name}`}
            icon={<FaDocker />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default DockerCard;
