import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPython } from 'react-icons/fa';

import { capitalize, normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const PypiCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query);
  const capitalCase = capitalize(normalizedQuery);
  const names = [normalizedQuery];
  const moreNames = [`Py${capitalCase}`];

  return (
    <Card title={t('providers.pypi')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`pypi.org/pypi/${name}/json`}
            service="existence"
            message="Read Python Packaging User Guide"
            link="https://packaging.python.org/"
            messageIfTaken="Go to PyPI"
            linkIfTaken={`https://pypi.org/project/${name}`}
            icon={<FaPython />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default PypiCard;
