import React, {useState, useEffect, Suspense} from 'react';
import styled from 'styled-components';
import useFetch from 'fetch-suspense';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import BarLoader from 'react-spinners/BarLoader';
import {GoInfo} from 'react-icons/go';
import {useTranslation} from 'react-i18next';
import {sendError} from '../../util/analytics';

import {mobile} from '../../util/css';
import {ExternalLink} from '../Links';

const COLORS = {
  available: '#6e00ff',
  unavailable: 'darkgrey',
  error: '#ff388b',
};

export const Card: React.FC<{title: string}> = ({title, children}) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <ErrorHandler>{children}</ErrorHandler>
      </CardContent>
    </CardContainer>
  );
};

export const Repeater: React.FC<{
  items: string[];
  moreItems?: string[];
  children: (name: string) => React.ReactNode;
}> = ({items = [], moreItems = [], children}) => {
  const [revealAlternatives, setRevealAlternatives] = useState(false);
  const {t} = useTranslation();

  function onClick() {
    setRevealAlternatives(true);
  }

  useEffect(() => {
    setRevealAlternatives(false);
  }, [items, moreItems]);

  return (
    <>
      {items.map((name) => (
        <ErrorHandler key={name}>{children(name)}</ErrorHandler>
      ))}

      {revealAlternatives
        ? moreItems.map((name) => (
            <ErrorHandler key={name}>{children(name)}</ErrorHandler>
          ))
        : null}
      {moreItems.length > 0 && !revealAlternatives ? (
        <Button onClick={onClick}>{t('showMore')}</Button>
      ) : null}
    </>
  );
};

interface Response {
  error?: string;
  availability: boolean;
}

export const DedicatedAvailability: React.FC<{
  name: string;
  query?: string;
  message?: string;
  messageIfTaken?: string;
  service: string;
  link: string;
  linkIfTaken?: string;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
}> = ({
  name,
  query = undefined,
  message = '',
  messageIfTaken = undefined,
  service,
  link,
  linkIfTaken = undefined,
  prefix = '',
  suffix = '',
  icon,
}) => {
  const response = useFetch(
    `/availability/${service}/${encodeURIComponent(query || name)}`,
  ) as Response;

  if (response.error) {
    throw new Error(`${service}: ${response.error}`);
  }

  return (
    <Result
      title={name}
      message={response.availability ? message : messageIfTaken || message}
      link={response.availability ? link : linkIfTaken || link}
      icon={icon}
      color={response.availability ? COLORS.available : COLORS.unavailable}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

export const ExistentialAvailability: React.FC<{
  name: string;
  target: string;
  message?: string;
  messageIfTaken?: string;
  link: string;
  linkIfTaken?: string;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
}> = ({
  name,
  message = '',
  messageIfTaken = undefined,
  target,
  link,
  linkIfTaken = undefined,
  prefix = '',
  suffix = '',
  icon,
}) => {
  const response = useFetch(target, undefined, {metadata: true});

  if (response.status !== 404 && response.status !== 200) {
    throw new Error(`${name}: ${response.status}`);
  }

  const availability = response.status === 404;

  return (
    <Result
      title={name}
      message={availability ? message : messageIfTaken || message}
      link={availability ? link : linkIfTaken || link}
      icon={icon}
      color={availability ? COLORS.available : COLORS.unavailable}
      prefix={prefix}
      suffix={suffix}
    />
  );
};

export const Result: React.FC<{
  title: string;
  message?: string;
  link?: string;
  icon: React.ReactNode;
  color?: string;
  prefix?: string;
  suffix?: string;
}> = ({
  title,
  message = '',
  link,
  icon,
  color = 'inherit',
  prefix = '',
  suffix = '',
}) => {
  const content = (
    <>
      {prefix}
      {title}
      {suffix}
    </>
  );
  return (
    <ResultContainer>
      <Tooltip
        title={message}
        position="bottom"
        arrow={true}
        animation="shift"
        duration="200">
        <ResultItem color={color}>
          <ResultIcon>{icon}</ResultIcon>
          <ResultName>
            {link ? (
              <ExternalLink href={link}>{content}</ExternalLink>
            ) : (
              content
            )}
          </ResultName>
        </ResultItem>
      </Tooltip>
    </ResultContainer>
  );
};

// 1. getDerivedStateFromError
// 2. render()
// 3. componentDidCatch() send errorInfo to Sentry
// 4. render(), now with eventId provided from Sentry
class ErrorBoundary extends React.Component<
  {},
  {hasError: boolean; message: string; eventId?: string}
> {
  constructor(props: {}) {
    super(props);
    this.state = {hasError: false, message: '', eventId: undefined};
  }

  // used in SSR
  static getDerivedStateFromError(error: Error) {
    return {hasError: true, message: error.message};
  }

  componentDidCatch(error: Error, errorInfo: any) {
    sendError(error, errorInfo).then((eventId) => {
      this.setState({eventId});
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Tooltip
          title={`${this.state.message}${
            this.state.eventId ? ` (${this.state.eventId})` : ''
          }`}
          position="bottom"
          arrow={true}
          animation="shift"
          duration="200">
          <ResultContainer>
            <ResultItem color={COLORS.error}>
              <ResultIcon>
                <GoInfo />
              </ResultIcon>
              <ResultName>Error</ResultName>
            </ResultItem>
          </ResultContainer>
        </Tooltip>
      );
    }
    return this.props.children;
  }
}

const ErrorHandler: React.FC = ({children}) => (
  <ErrorBoundary>
    <Suspense
      fallback={
        <ResultContainer>
          <BarLoader />
        </ResultContainer>
      }>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const CardContainer = styled.div`
  padding: 40px;

  ${mobile} {
    margin-bottom: 40px;
    padding: 0px;
  }
`;

const CardTitle = styled.div`
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: bold;

  ${mobile} {
    padding-left: 20px;
  }
`;

const CardContent = styled.div`
  border-radius: 2px;

  ${mobile} {
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    background: white;
    border-radius: 0;
  }
`;

const Button = styled.div`
  margin-top: 5px;
  display: inline-block;
  padding: 5px 0;
  border: none;
  border-bottom: 1px dashed black;
  cursor: pointer;
  font-family: monospace;
  font-size: 0.8em;
`;

const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const ResultIcon = styled.div`
  width: 1em;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  word-break: break-all;
  color: ${({color}) => color};
`;

const ResultName = styled.div`
  margin-left: 6px;
  line-height: 1em;
  font-family: monospace;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;
