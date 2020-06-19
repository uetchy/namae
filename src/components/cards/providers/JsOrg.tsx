import React from 'react';
import {useTranslation} from 'react-i18next';
import {FaJsSquare} from 'react-icons/fa';

import {Card, Repeater, DedicatedAvailability} from '../core';

const JsOrgCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();

  const sanitizedQuery = query
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .replace(/_/g, '-');
  const lowerCase = sanitizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.jsorg')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={`${name}.js.org`}
            service="dns"
            message="Go to js.org repository"
            link="https://github.com/js-org/js.org"
            messageIfTaken={`Go to ${name}.js.org`}
            linkIfTaken={`https://${name}.js.org`}
            icon={<FaJsSquare />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default JsOrgCard;
