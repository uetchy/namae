import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiDebian, SiUbuntu } from 'react-icons/si';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const LinuxCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query);
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.linux')}>
      <Repeater items={names}>
        {(name) => (
          <>
            <DedicatedAvailability
              name={name}
              service="launchpad"
              message="Go to Launchpad"
              link={`https://launchpad.net/ubuntu/+source/${name}`}
              icon={<SiUbuntu />}
            />
            <DedicatedAvailability
              name={name}
              service="debian"
              message="Go to debian.org"
              link={`https://packages.debian.org/buster/${name}`}
              icon={<SiDebian />}
            />
          </>
        )}
      </Repeater>
    </Card>
  );
};

export default LinuxCard;
