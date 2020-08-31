import useFetch from 'fetch-suspense';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { SiAppstore } from 'react-icons/si';
import { Card, Result } from '../core';

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const term = encodeURIComponent(query);
  const response = useFetch(
    `/api/services/appstore/${term}?country=${t('countryCode')}`
  ) as {
    result: Array<{ name: string; viewURL: string; price: number; id: string }>;
  };
  const apps = response.result;

  return (
    <>
      {apps && apps.length > 0 ? (
        apps.map((app) => (
          <Result
            title={app.name.split(/[－–—\-:]/)[0]}
            message={`Price: ${app.price}`}
            link={app.viewURL}
            icon={<SiAppstore />}
            key={app.id}
          />
        ))
      ) : (
        <Result title={t('noResult')} icon={<FaInfoCircle />} />
      )}
    </>
  );
};

const AppStoreCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('providers.appStore')}>
      <Search query={query} />
    </Card>
  );
};

export default AppStoreCard;
