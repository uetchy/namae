import React from 'react';
import {useTranslation} from 'react-i18next';
import {OcamlIcon} from '../../Icons';

import {Card, Repeater, DedicatedAvailability} from '../core';

const OcamlCard: React.FC<{query: string}> = ({query}) => {
  const {t} = useTranslation();
  const lowerCase = query.toLowerCase();

  const names = [lowerCase];

  return (
    <Card title={t('providers.ocaml')}>
      <Repeater items={names}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            query={`opam.ocaml.org/packages/${name}/`}
            service="existence"
            message="Go to opam"
            link={`https://opam.ocaml.org/packages/${name}/`}
            icon={<OcamlIcon />}
          />
        )}
      </Repeater>
    </Card>
  );
};

export default OcamlCard;
