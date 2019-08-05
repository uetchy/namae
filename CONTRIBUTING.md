# Contribution Guide

## Setup environment

Install `now` for development server:

```
yarn global add now
```

then install deps and fire up dev server.

```
yarn install
yarn start
```

## Add new provider

Create `web/src/components/cards/<NewCard>.js`. Here is the example card that checks if spcified repository on GitHub is available.

```jsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'

import { Card, Repeater, DedicatedAvailability } from '../Cards'

export default function GithubCard({ name }) {
  const { t } = useTranslation()
  const lowerCase = name.toLowerCase()

  const names = [name]
  const moreNames = [
    `${lowerCase}hq`,
    `${lowerCase}-team`,
    `${lowerCase}-org`,
    `${lowerCase}-js`,
  ]

  return (
    <Card title={t('providers.github')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="github"
            link={`https://github.com/${name}`}
            prefix="github.com/"
            icon={<FaGithub />}
          />
        )}
      </Repeater>
    </Card>
  )
}
```

and add the card to `/web/src/App.js`:

```jsx
import NewCard from './components/cards/NewCard'
```

```patch
<SearchResult>
  <Cards>
    <GithubCard name={query} />
    <DomainCard name={query} />
    <TwitterCard name={query} />
    <HomebrewCard name={query} />
    <NpmCard name={query} />
    <PypiCard name={query} />
    <CratesioCard name={query} />
    <JsOrgCard name={query} />
    <SlackCard name={query} />
    <S3Card name={query} />
+   <NewCard name={query} />
  </Cards>
</SearchResult>
```

### ExistentialAvailability

`ExistentialAvailability` check if the response from passed URL returns `404` or not.
For example, `<ExistentialAvailability target="https://formulae.brew.sh/api/formula/git.json" />` will send a request to `target` and see if it returns with 404. For security reasons, `target` must send back `Access-Control-Allow-Origin: *` header for bridging across cross-site requests. If they don't support `Access-Control-Allow-Origin`, you might want to use `DedicatedAvailability` for dedicated response handling.

### DedicatedAvailability

`DedicatedAvailability` is for interacting with defined API endpoint to check availability.
For example, `<DedicatedAvailability service="<service>" />` will send a request to `https://namae.dev/availability/<service>/<query>` which is routed to `/api/services/<service>.js` in the repo.
