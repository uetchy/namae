import useFetch from 'fetch-suspense';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiChromeFill } from 'react-icons/ri';
import { Card, Result } from '../core';

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const response = useFetch(
    `/api/services/chrome-web-store/${encodeURIComponent(query)}`
  ) as {
    result: Array<{
      name: string;
      url: string;
      description: string;
      id: string;
    }>;
  };
  const apps = response.result;

  return (
    <>
      {apps && apps.length > 0 ? (
        apps.map((app) => (
          <Result
            title={app.name}
            message={app.description}
            link={app.url}
            icon={<RiChromeFill />}
            key={app.id}
          />
        ))
      ) : (
        <Result
          title={t('noResult')}
          message={t('noResult')}
          icon={<RiChromeFill />}
        />
      )}
    </>
  );
};

const ChromeWebStoreCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('providers.chromeWebStore')}>
      <Search query={query} />
    </Card>
  );
};

export default ChromeWebStoreCard;
