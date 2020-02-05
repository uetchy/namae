import React from 'react';
import {useTranslation} from 'react-i18next';
import {NowIcon} from '../../Icons';

import {Card, Repeater, DedicatedAvailability} from '../core';

const NowCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();
  const lowerCase = query.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.now')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.now.sh`}
            service="existence"
            message={`Open ${name}.now.sh`}
            link={`https://${name}.now.sh`}
            icon={<NowIcon />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default NowCard;
