import React from 'react';
import {useTranslation} from 'react-i18next';
import {DiUbuntu} from 'react-icons/di';
import {DiDebian} from 'react-icons/di';

import {Card, Repeater, DedicatedAvailability} from '../core';

const LinuxCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();
  const lowerCase = query.toLowerCase();

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
              icon={<DiUbuntu />}
            />
            <DedicatedAvailability
              name={name}
              service="debian"
              message="Go to debian.org"
              link={`https://packages.debian.org/buster/${name}`}
              icon={<DiDebian />}
            />
          </>
        )}
      </Repeater>
    </Card>
  );
};

export default LinuxCard;
