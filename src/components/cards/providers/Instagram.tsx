import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const InstagramCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, { allowHyphens: false });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [normalizedQuery];
  const moreNames = [`${lowerCase}app`, `${lowerCase}_hq`, `get.${lowerCase}`];

  return (
    <Card title={t('providers.instagram')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="instagram"
            link={`https://www.instagram.com/${name}/`}
            message="Go to Instagram"
            icon={<FaInstagram />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default InstagramCard;
