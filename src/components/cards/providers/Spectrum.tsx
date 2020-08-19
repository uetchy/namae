import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Repeater, DedicatedAvailability } from '../core'
import { SpectrumIcon } from '../../Icons'

const SpectrumCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation()
  const names = [query]

  return (
    <Card title={t('providers.spectrum')}>
      <Repeater items={names}>
        {(name) => (
          <>
            <DedicatedAvailability
              name={name}
              service="spectrum"
              message="Create Community"
              link="https://spectrum.chat/new/community"
              messageIfTaken="See community in Spectrum"
              linkIfTaken={`https://spectrum.chat/${name}`}
              icon={<SpectrumIcon />}
            />
          </>
        )}
      </Repeater>
    </Card>
  )
}

export default SpectrumCard
