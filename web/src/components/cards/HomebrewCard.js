import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosBeer } from 'react-icons/io'
import { Card } from '../Cards'
import { ExistentialAvailability } from '../Cards'

export default function HomebrewCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  return (
    <Card title={t('providers.homebrew')} nameList={[lowerCase]}>
      {(name) => (
        <>
          <ExistentialAvailability
            name={name}
            target={`https://formulae.brew.sh/api/formula/${name}.json`}
            link={`https://formulae.brew.sh/formula/${name}`}
            icon={<IoIosBeer />}
          />
          <ExistentialAvailability
            name={name}
            target={`https://formulae.brew.sh/api/cask/${name}.json`}
            link={`https://formulae.brew.sh/cask/${name}`}
            suffix=" (Cask)"
            icon={<IoIosBeer />}
          />
        </>
      )}
    </Card>
  )
}
