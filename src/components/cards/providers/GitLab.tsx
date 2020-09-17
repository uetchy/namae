import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGitlab } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const GitLabCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.gitlab')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            prefix="gitlab.com/"
            service="gitlab"
            message={`Open gitlab.com/${name}`}
            link={`https://gitlab.com/${name}`}
            icon={<FaGitlab />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default GitLabCard;
