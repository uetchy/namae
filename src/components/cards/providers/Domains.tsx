import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdDomain } from 'react-icons/md';

import { Card, Repeater, DedicatedAvailability } from '../core';
import { zones } from '../../../util/zones';

const DomainCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const sanitizedQuery = query
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .replace(/_/g, '-');
  const lowerCase = sanitizedQuery.toLowerCase();

  const domainHackSuggestions = zones
    .map((zone) => new RegExp(`${zone}$`).exec(lowerCase.slice(1)))
    .filter((s): s is RegExpExecArray => s !== null)
    .map(
      (m) =>
        lowerCase.substring(0, m.index + 1) +
        '.' +
        lowerCase.substring(m.index + 1)
    );

  const names = [
    `${lowerCase}.com`,
    `${lowerCase}.org`,
    `${lowerCase}.app`,
    `${lowerCase}.dev`,
    `${lowerCase}.io`,
    `${lowerCase}.sh`,
    ...domainHackSuggestions,
  ];
  const moreNames = [
    `${lowerCase}app.com`,
    `get${lowerCase}.com`,
    `${lowerCase}.co`,
    `${lowerCase}.tools`,
    `${lowerCase}.build`,
    `${lowerCase}.run`,
    `${lowerCase}.ai`,
    `${lowerCase}.design`,
    `${lowerCase}.directory`,
    `${lowerCase}.guru`,
    `${lowerCase}.ninja`,
    `${lowerCase}.net`,
    `${lowerCase}.info`,
    `${lowerCase}.biz`,
    `${lowerCase}.website`,
    `${lowerCase}.eu`,
  ];

  return (
    <Card title={t('providers.domains')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            message="Go to Domainr.com"
            service="domain"
            link={`https://domainr.com/?q=${name}`}
            icon={<MdDomain />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default DomainCard;
