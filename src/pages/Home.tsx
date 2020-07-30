import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Content, Header } from '../theme';
import Form from '../components/Form';
import Welcome from '../components/Welcome';
export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>namae — {t('title')}</title>
      </Helmet>

      <Header>
        <Form />
      </Header>

      <Content>
        <Welcome />
      </Content>
    </>
  );
}
