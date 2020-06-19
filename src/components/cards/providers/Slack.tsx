import React from 'react';
import {useTranslation} from 'react-i18next';
import {FaSlack} from 'react-icons/fa';

import {Card, DedicatedAvailability, Repeater} from '../core';

const SlackCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();

  const sanitizedQuery = query
    .replace(/[^0-9a-zA-Z_-]/g, '')
    .replace(/_/g, '-');
  const lowerCase = sanitizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.slack')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="slack"
            message="Create Slack Team"
            link="https://slack.com/create"
            messageIfTaken={`Go to ${name}.slack.com`}
            linkIfTaken={`https://${name}.slack.com`}
            suffix=".slack.com"
            icon={<FaSlack />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default SlackCard;
