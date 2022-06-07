import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiFirebase } from 'react-icons/si';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const FirebaseCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.firebase')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`${name}.firebaseio.com`}
            service="existence"
            message="Go to Firebase"
            link={`https://${name}.firebaseio.com/`}
            icon={<SiFirebase />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default FirebaseCard;
