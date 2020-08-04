import React from 'react';
import {useTranslation} from 'react-i18next';
import {MdDomain} from 'react-icons/md';

import {Card, Repeater, DedicatedAvailability} from '../core';
import {zones} from '../../../util/zones';

const DomainCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();

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
        lowerCase.substring(m.index + 1),
    );

  const names = [
    `${lowerCase}.com`,
    `${lowerCase}app.com`,
    `${lowerCase}.app`,
    `${lowerCase}.dev`,
    `${lowerCase}.org`,
    `${lowerCase}.io`,
    ...domainHackSuggestions,
  ];
  const moreNames = [
    `${lowerCase}.sh`,
    `${lowerCase}.tools`,
    `${lowerCase}.design`,
    `${lowerCase}.build`,
    `${lowerCase}.run`,
    `get${lowerCase}.com`,
    `${lowerCase}.net`,
    `${lowerCase}.eu`,
    `${lowerCase}.info`,
    `${lowerCase}.biz`,
    `${lowerCase}.website`,
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
