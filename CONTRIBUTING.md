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

Create `web/src/components/cards/<NewCard>.js` and paste following template into it:

```jsx
import React from 'react'
import { FaGithub } from 'react-icons/fa'

import { Card } from '../Card'
import { ExistentialAvailability } from '../Availability'
import { capitalize } from '../../util/text'

export default function NewCard({ name }) {
  return (
    <Card
      title="NewCard"
      key={name}
      nameList={[name, `${name}-team`]}
      alternativeList={[`${capitalize(name)}HQ`]}>
      {(name) => (
        <ExistentialAvailability
          name={name}
          target={`https://api.newservice.com/items/${name}`}
          link={`https://newservice.com/${name}`}
          prefix="newservice.com/"
          icon={<FaGithub />}
        />
      )}
    </Card>
  )
}
```

and add the card to `/web/src/App.js`:

```jsx
import NewCard from './components/cards/NewCard'
```

```jsx
<Cards>
  <CardHeader>Result for {query}</CardHeader>
  <CardContainer>
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
    <NewCard name={query} />
  </CardContainer>
</Cards>
```

### ExistentialAvailability

`ExistentialAvailability` check if the response from passed URL returns `404` or not.
For example, `<ExistentialAvailability target="https://formulae.brew.sh/api/formula/git.json" />` will send a request to `target` and see if it returns with 404. For security reasons, `target` must send back `Access-Control-Allow-Origin: *` header for bridging across cross-site requests. If they don't support `Access-Control-Allow-Origin`, you might want to use `DedicatedAvailability` for dedicated response handling.

### DedicatedAvailability

`DedicatedAvailability` is for interacting with defined API endpoint to check availability.
For example, `<DedicatedAvailability service="<service>" />` will send a request to `https://namae.dev/availability/<service>/<query>` which is routed to `/api/services/<service>.js` in the repo.

```

```
