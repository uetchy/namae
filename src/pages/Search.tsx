import Tooltip from 'rc-tooltip';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { IoIosFlash, IoIosRocket } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Cards from '../components/cards';
import {
  AvailableIcon,
  COLORS as ResultColor,
  ResultIcon,
  ResultItem,
  ResultName,
} from '../components/cards/core';
import Form from '../components/Form';
import { useStoreState } from '../store';
import { Content, Header } from '../theme';
import { mobile } from '../util/css';
import { sanitize } from '../util/text';

export default function Search() {
  const { query } = useParams<{ query: string }>();
  const currentQuery = sanitize(query);
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Search for &quot;{currentQuery}&quot; — namae</title>
      </Helmet>
      <Header>
        <Form initialValue={currentQuery} />
      </Header>
      <Content>
        <Legend>
          <Stat />
          <ResultItem color={ResultColor.available}>
            <ResultIcon>
              <IoIosRocket />
            </ResultIcon>
            <ResultName>{t('available')}</ResultName>
            <AvailableIcon>
              <IoIosFlash />
            </AvailableIcon>
          </ResultItem>
          <ResultItem color={ResultColor.unavailable}>
            <ResultIcon>
              <IoIosRocket />
            </ResultIcon>
            <ResultName>{t('unavailable')}</ResultName>
          </ResultItem>
        </Legend>
        <Cards query={currentQuery} />
      </Content>
    </>
  );
}

function Stat() {
  const totalCount = useStoreState((state) => state.stats.totalCount);
  const availableCount = useStoreState((state) => state.stats.availableCount);
  const { t } = useTranslation();

  const uniqueness = availableCount !== 0 ? availableCount / totalCount : 0.0;
  const uniquenessText = ((n) => {
    if (n > 0.7 && n <= 1.0) {
      return t('uniqueness.high');
    } else if (n > 0.4 && n <= 0.7) {
      return t('uniqueness.moderate');
    } else {
      return t('uniqueness.low');
    }
  })(uniqueness);

  return (
    <UniquenessIndicator>
      <Tooltip
        overlay={t('uniqueness.description')}
        placement="top"
        trigger={['hover']}
      >
        <span>
          {uniquenessText} ({(uniqueness * 100).toFixed(1)} UNIQ)
        </span>
      </Tooltip>
    </UniquenessIndicator>
  );
}

export const Legend = styled.div`
  margin-top: -100px;
  padding: 100px 0 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  user-select: none;
  cursor: default;
  background-color: #f6f6fa;

  ${mobile} {
    flex-direction: column;
    align-items: center;
    margin-top: -80px;
    padding: 70px 0 30px;
    background-color: none;
  }

  > * {
    margin: 0 10px 0;
  }
`;

export const UniquenessIndicator = styled.div`
  color: #7b7b7b;
`;
