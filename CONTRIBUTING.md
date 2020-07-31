# Contribution Guide

## Setup

Install `vercel` for development server:

```
npm i -g vercel
```

then install deps and fire up dev server.

```
yarn install
vc dev
```

## Adding new provider

Create `src/components/cards/providers/<NewCard>.tsx`. Here is the example card that checks if specified repository on GitHub is available.

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

import { Card, Repeater, DedicatedAvailability } from '../core';

const GithubCard: React.FC<{ query: string }> = ({ name }) => {
  const { t } = useTranslation();
  const lowerCase = name.toLowerCase();

  const names = [name];
  const moreNames = [
    `${lowerCase}hq`,
    `${lowerCase}-team`,
    `${lowerCase}-org`,
    `${lowerCase}-js`,
  ];

  return (
    <Card title={t('providers.github')}>
      <Repeater items={names} moreItems={moreNames}>
        {(name) => (
          <DedicatedAvailability
            name={name}
            service="github" // route to http://namae.dev/api/services/github/<query> which is /api/services/github/[query].ts in the source
            link={`https://github.com/${name}`}
            prefix="github.com/"
            icon={<FaGithub />}
          />
        )}
      </Repeater>
    </Card>
  );
};
```

and add the card to `src/components/cards/index.tsx`:

```jsx
import NewCard from './providers/NewCard';
```

```patch
<>
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
</>
```

### ExistentialAvailability

`ExistentialAvailability` check if the response from passed URL returns `404` or not.
For example, `<ExistentialAvailability target="https://formulae.brew.sh/api/formula/git.json" />` will send a request to `target` and see if it returns with 404. For security reasons, `target` must send back `Access-Control-Allow-Origin: *` header for bridging across cross-site requests. If they don't support `Access-Control-Allow-Origin`, you might want to use `DedicatedAvailability` for dedicated response handling.

### DedicatedAvailability

`DedicatedAvailability` is for interacting with defined API endpoint to check availability.
For example, `<DedicatedAvailability service="<service>" />` will send a request to `https://namae.dev/availability/<service>/<query>` which is routed to `/api/services/<service>.js` in the repo.

## Adding new language

Suppose we'll add a support for Esperanto.

```bash
cd public/locales
cp -r en eo
# edit eo/translation.json
```

then edit `src/util/i18n.ts`:

```patch
- const TRANSLATION_VERSION = '2';
+ const TRANSLATION_VERSION = '3';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [LocalStorageBackend, XHR],
      backendOptions: [
        {
          versions: {
            en: TRANSLATION_VERSION,
            ja: TRANSLATION_VERSION,
            'zh-Hans': TRANSLATION_VERSION,
            'zh-Hant': TRANSLATION_VERSION,
+           eo: TRANSLATION_VERSION,
          },
        },
      ],
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
```
