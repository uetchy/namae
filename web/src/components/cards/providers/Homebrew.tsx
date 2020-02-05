import React from 'react';
import {useTranslation} from 'react-i18next';
import {IoIosBeer} from 'react-icons/io';

import {Card, Repeater, ExistentialAvailability} from '../core';

const HomebrewCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();
  const lowerCase = query.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.homebrew')}>
      <Repeater items={names}>
        {(name) => (
          <>
            <ExistentialAvailability
              name={name}
              target={`https://formulae.brew.sh/api/formula/${name}.json`}
              message="Read Contribution Guide"
              link="https://docs.brew.sh/How-To-Open-a-Homebrew-Pull-Request"
              messageIfTaken="Go to formula page"
              linkIfTaken={`https://formulae.brew.sh/formula/${name}`}
              icon={<IoIosBeer />}
            />
            <ExistentialAvailability
              name={name}
              target={`https://formulae.brew.sh/api/cask/${name}.json`}
              message="Read Contribution Guide"
              link="https://docs.brew.sh/How-To-Open-a-Homebrew-Pull-Request"
              messageIfTaken="Go to formula page"
              linkIfTaken={`https://formulae.brew.sh/cask/${name}`}
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
