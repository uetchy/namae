import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCloudflare } from 'react-icons/fa';
import { normalize } from '../../../util/text';

import { Card, Repeater, DedicatedAvailability } from '../core';

const CloudflareCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    alphanumeric: false,
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [normalizedQuery];
  const moreNames = [
    `${lowerCase}-web`,
    `${lowerCase}-webapp`,
    `${lowerCase}-site`,
  ];

  return (
    <Card title={t('providers.cloudflare')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.pages.dev`}
            service="existence"
            message={`Go to ${name}.pages.dev`}
            link={`https://${name}.pages.dev`}
            icon={<FaCloudflare />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default CloudflareCard;
