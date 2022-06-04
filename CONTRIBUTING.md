# Contribution Guide

## Setup

Install deps and fire up a dev server.

```
yarn install
yarn dev
```

Run tests before creating a pull request:

```
yarn test
```

## Adding new provider

Create `src/components/cards/providers/<NewCard>.tsx`. Here is the example card for checking GitHub namespaces.

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
            service="github" // route to http://namae.dev/api/services/github/<query> which is /api/services/github/[query].ts on GitHub
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
For example, `<ExistentialAvailability target="https://formulae.brew.sh/api/formula/git.json" />` will send a request to `target` and see if it returns with 404. For security reasons, `target` must send back `Access-Control-Allow-Origin: *` header for bridging across cross-site requests. If they don't support `Access-Control-Allow-Origin`, you might want to use `DedicatedAvailability` for server-side handling.

### DedicatedAvailability

`DedicatedAvailability` is for interacting with defined API endpoint to check availability.
For example, `<DedicatedAvailability service="<service>" />` will send a request to `https://namae.dev/availability/<service>/<query>` which is routed to `/api/services/<service>.js`.

## Adding a new language

Suppose we'll add a support for Esperanto. First, copy `public/locales/en` folder and rename to `public/locales/eo` which is a language code for Esperanto.

```bash
cd public/locales
cp -r en eo
```

Then translate `eo/translation.json`.

After that, edit `src/util/i18n.ts`:

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

and `src/components/Footer.tsx`:

```patch
const Languages = () => {
  const { t } = useTranslation();

  return (
    <Pane>
      <Title>{t('language')}</Title>
      <ul>
        <li>
          <a href="/?lng=en">English</a>
        </li>
        <li>
          <a href="/?lng=de">Deutsch</a>
        </li>
        <li>
          <a href="/?lng=fr">Français</a>
        </li>
        <li>
          <a href="/?lng=ja">日本語</a>
        </li>
        <li>
          <a href="/?lng=zh-Hans">简体中文</a>
        </li>
        <li>
          <a href="/?lng=zh-Hant">繁體中文</a>
        </li>
        <li>
          <a href="/?lng=pt-BR">Português-BR</a>
        </li>
+       <li>
+         <a href="/?lng=eo">Esperanto</a>
+       </li>
      </ul>
    </Pane>
  );
};
```
