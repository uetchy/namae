# Contribution Guide

## Setup environment

Install `now` for development:

```
yarn global add now
```

then install deps and fire up dev server.

```
yarn install
yarn start
```

## Add new provider

Create `web/src/components/cards/<NewCard>.js` and paste following GitHub example into it:

```jsx
import React from 'react'
import { FaGithub } from 'react-icons/fa'

import { Card } from '../Card'
import { DedicatedAvailability } from '../Availability'
import { capitalize } from '../../util/text'

export default function CratesioCard({ name }) {
  return (
    <Card
      title="GitHub"
      key={name}
      nameList={[name, `${name}-team`]}
      alternativeList={[`${capitalize(name)}HQ`]}>
      {(name) => (
        <DedicatedAvailability
          name={name}
          service="github"
          link={`https://github.com/${name}`}
          prefix="github.com/"
          suffix=""
          icon={<FaGithub />}
        />
      )}
    </Card>
  )
}
```

### ExistentialAvailability

`ExistentialAvailability` check if the response from passed URL returns `404` or not.
For example, `<ExistentialAvailability target="https://formulae.brew.sh/api/formula/git.json" />` will send a request to `target` and see if it returns with 404. For security reasons, `target` must send back `Access-Control-Allow-Origin: *` header for bridging across cross-site requests. If they don't support `Access-Control-Allow-Origin`, you might want to use `DedicatedAvailability` for dedicated response handling.

### DedicatedAvailability

`DedicatedAvailability` is for interacting with defined API endpoint to check availability.
For example, `<DedicatedAvailability service="github" />` will send a request to `https://namae.dev/availability/<github>/<query>` which is routed to `/api/services/github.js` in the repo.
