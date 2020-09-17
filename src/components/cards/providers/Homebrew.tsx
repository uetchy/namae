import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosBeer } from 'react-icons/io';
import { normalize } from '../../../util/text';

import { Card, Repeater, ExistentialAvailability } from '../core';

const HomebrewCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const normalizedQuery = normalize(query);
  const lowerCase = normalizedQuery.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.homebrew')}>
      <Repeater items={names}>
        {(name) => (
          <>
            <ExistentialAvailability
              name={name}
              target={`https://formulae.brew.sh/api/formula/${name}.json`}
              message="Go to formula page"
              link={`https://formulae.brew.sh/formula/${name}`}
              icon={<IoIosBeer />}
            />
            <ExistentialAvailability
              name={name}
              target={`https://formulae.brew.sh/api/cask/${name}.json`}
              message="Go to formula page"
              link={`https://formulae.brew.sh/cask/${name}`}
              suffix=" (Cask)"
              icon={<IoIosBeer />}
            />
          </>
        )}
      </Repeater>
    </Card>
  );
};

export default HomebrewCard;
