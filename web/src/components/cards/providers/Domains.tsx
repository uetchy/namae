import React from 'react';
import {useTranslation} from 'react-i18next';
import {MdDomain} from 'react-icons/md';

import {Card, Repeater, DedicatedAvailability} from '../core';

const DomainCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();
  const lowerCase = query.toLowerCase();

  const names = [`${lowerCase}.com`, `${lowerCase}.io`, `${lowerCase}.app`];
  const moreNames = [
    `${lowerCase}.org`,
    `${lowerCase}.dev`,
    `${lowerCase}.sh`,
    `${lowerCase}.pro`,
    `${lowerCase}.tools`,
    `${lowerCase}.site`,
    `${lowerCase}app.com`,
    `get${lowerCase}.com`,
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