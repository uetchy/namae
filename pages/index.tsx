import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Form from '../components/Form';
import Welcome from '../components/Welcome';
import { Content, Header } from '../src/theme';

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>namae — {t('title')}</title>
      </Helmet>

      <Header>
        <Form useSuggestion={false} />
      </Header>

      <Content>
        <Welcome />
      </Content>
    </>
  );
}
