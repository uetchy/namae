import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdDomain } from 'react-icons/md';
import { normalize } from '../../../util/text';
import { zones } from '../../../util/zones';
import { Card, DedicatedAvailability, Repeater } from '../core';

export interface DomainrResponse {
  results: {
    domain: string;
    host: string;
    subdomain: string;
    zone: string;
    path: string;
    registerURL: string;
  }[];
}

// function fetcher(url: string) {
//   return fetch(url, {}).then((res) => res.json());
// }

const DomainCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const normalizedQuery = normalize(query, {
    alphanumeric: false,
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const domainHackSuggestions = zones
    .map((zone) => new RegExp(`${zone}$`).exec(lowerCase.slice(1)))
    .filter((s): s is RegExpExecArray => s !== null)
    .map(
      (m) =>
        lowerCase.substring(0, m.index + 1) +
        '.' +
        lowerCase.substring(m.index + 1)
    );

  // const { data } = useSWR<DomainrResponse>(
  //   `/api/list/domain/${encodeURIComponent(query)}`,
  //   fetcher
  // );

  // const cctldSuggestions =
  //   data?.results
  //     ?.filter((res) => res.subdomain !== '' && res.path === '')
  //     ?.map((res) => res.domain) ?? [];

  const names =
    // use Set() to eliminate dupes
    new Set([
      ...['com', 'org', 'app', 'io'].map((tld) => lowerCase + '.' + tld),
      ...domainHackSuggestions,
    ]);

  const moreNames = new Set([
    `${lowerCase}app.com`,
    `get${lowerCase}.com`,
    `join${lowerCase}.com`,
    ...[
      'dev',
      'co',
      'ai',
      'sh',
      'rs',
      'cloud',
      'tools',
      'build',
      'run',
      'design',
      'directory',
      'guru',
      'ninja',
      'info',
      'biz',
      'eu',
    ].map((tld) => lowerCase + '.' + tld),
  ]);

  for (const name of moreNames) {
    if (names.has(name)) {
      moreNames.delete(name);
    }
  }

  return (
    <Card title={t('providers.domains')}>
      <Repeater items={Array.from(names)} moreItems={Array.from(moreNames)}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            message={`Go to ${name}`}
            service="domain"
            link={'http://' + name}
            icon={<MdDomain />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default DomainCard;
