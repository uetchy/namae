import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiNpmjsFill, RiNpmjsLine } from 'react-icons/ri';
import { normalize } from '../../../util/text';
import { Card, DedicatedAvailability, Repeater } from '../core';

const NpmCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query, {
    allowUnderscore: false,
  });
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];
  const moreNames = [`${lowerCase}-js`, `${lowerCase}js`];

  return (
    <Card title={t('providers.npm')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <>
            <DedicatedAvailability
              name={name}
              service="npm"
              message={`See ${name}`}
              link={`https://www.npmjs.com/package/${name}`}
              messageIfTaken={`See ${name}`}
              linkIfTaken={`https://www.npmjs.com/package/${name}`}
              icon={<RiNpmjsFill />}
            />
            <DedicatedAvailability
              name={name}
              service="npm-org"
              message="Create Org"
              link="https://www.npmjs.com/org/create"
              messageIfTaken={`See @${name}`}
              linkIfTaken={`https://www.npmjs.com/org/${name}`}
              prefix="@"
              suffix=" (Organization)"
              icon={<RiNpmjsLine />}
            />
          </>
        )}
      </Repeater>
    </Card>
  );
};

export default NpmCard;
