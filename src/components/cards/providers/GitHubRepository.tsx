import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const GithubCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {});
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [normalizedQuery, `${lowerCase}-dev`, `${lowerCase}-org`];
  const moreNames = [
    `${lowerCase}hq`,
    `${lowerCase}-team`,
    `${lowerCase}js`,
    `${lowerCase}-rs`,
  ];

  return (
    <Card title={t('providers.github')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`github.com/${name}`}
            service="existence"
            message={`Go to github.com/${name}`}
            link={`https://github.com/${name}`}
            prefix="github.com/"
            icon={<FaGithub />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default GithubCard;
