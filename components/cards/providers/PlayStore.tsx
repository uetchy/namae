import useFetch from 'fetch-suspense';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { IoMdAppstore } from 'react-icons/io';
import { Card, Result } from '../core';

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const response = useFetch(
    `/api/services/playstore/${encodeURIComponent(query)}}`
  ) as {
    result: Array<{
      id: string;
      name: string;
      description: string;
      author: string;
      url: string;
    }>;
  };
  const apps = response.result;

  return (
    <>
      {apps && apps.length > 0 ? (
        apps.map((app) => (
          <Result
            title={app.name.split(/\s[－–—\-:]\s/)[0]}
            message={`${app.author}: ${app.description}`}
            link={app.url}
            icon={<IoMdAppstore />}
            key={app.id}
          />
        ))
      ) : (
        <Result
          title={t('noResult')}
          message={t('noResult')}
          icon={<FaInfoCircle />}
        />
      )}
    </>
  );
};

const PlayStoreCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('providers.playStore')}>
      <Search query={query} />
    </Card>
  );
};

export default PlayStoreCard;
