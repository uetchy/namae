import React from 'react';
import {useTranslation} from 'react-i18next';
import {FaTwitter} from 'react-icons/fa';

import {capitalize} from '../../../util/text';
import {Card, Repeater, DedicatedAvailability} from '../core';

const TwitterCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();
  const lowerCase = query.toLowerCase();
  const capitalCase = capitalize(query);

  const names = [query, `${capitalCase}App`, `${lowerCase}hq`];
  const moreNames = [
    `hey${lowerCase}`,
    `${capitalCase}Team`,
    `${lowerCase}-support`,
    `${lowerCase}_org`,
    `${lowerCase}-app`,
    `${capitalCase}JS`,
  ];

  return (
    <Card title={t('providers.twitter')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`twitter.com/${name}`}
            service="existence"
            message="Go to Twitter"
            link={`https://twitter.com/${name}`}
            prefix="twitter.com/"
            icon={<FaTwitter />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default TwitterCard;
