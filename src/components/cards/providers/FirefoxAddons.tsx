import useFetch from 'fetch-suspense';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFirefoxBrowser } from 'react-icons/fa';
import { Card, Result } from '../core';

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const response = useFetch(
    `/api/services/firefox-addons/${encodeURIComponent(query)}`
  ) as {
    result: Array<{
      name: string;
      url: string;
      author: string;
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
            title={app.name.split(/\s[－–—\-:]\s/)[0]}
            message={`${app.author}: ${app.description}`}
            link={app.url}
            icon={<FaFirefoxBrowser />}
            key={app.id}
          />
        ))
      ) : (
        <Result
          title={t('noResult')}
          message={t('noResult')}
          icon={<FaFirefoxBrowser />}
        />
      )}
    </>
  );
};

const FirefoxAddonsCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('providers.firefoxAddons')}>
      <Search query={query} />
    </Card>
  );
};

export default FirefoxAddonsCard;
