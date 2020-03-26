import React, {useState, useEffect, Suspense} from 'react';
import styled from 'styled-components';
import useFetch from 'fetch-suspense';
import {Tooltip} from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import BarLoader from 'react-spinners/BarLoader';
import {GoInfo} from 'react-icons/go';
import {IoIosFlash} from 'react-icons/io';
import {useTranslation} from 'react-i18next';
import {OutboundLink} from 'react-ga';

import {sendError, sendExpandEvent} from '../../util/analytics';
import {mobile} from '../../util/css';

export const COLORS = {
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
    sendExpandEvent();
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

class APIError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
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
    throw new APIError(`${service}: ${response.error}`);
  }

  return (
    <Result
      title={name}
      message={response.availability ? message : messageIfTaken || message}
      link={response.availability ? link : linkIfTaken || link}
      icon={icon}
      prefix={prefix}
      suffix={suffix}
      availability={response.availability}
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
    throw new NotFoundError(`${name}: ${response.status}`);
  }

  const availability = response.status === 404;

  return (
    <Result
      title={name}
      message={availability ? message : messageIfTaken || message}
      link={availability ? link : linkIfTaken || link}
      icon={icon}
      prefix={prefix}
      suffix={suffix}
      availability={availability}
    />
  );
};

export const Result: React.FC<{
  title: string;
  message?: string;
  link?: string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  availability?: boolean;
}> = ({
  title,
  message = '',
  link,
  icon,
  prefix = '',
  suffix = '',
  availability,
}) => {
  const content = (
    <>
      {prefix}
      {title}
      {suffix}
    </>
  );
  const itemColor =
    availability === undefined
      ? 'inherit'
      : availability
      ? COLORS.available
      : COLORS.unavailable;
  return (
    <ResultContainer>
      <Tooltip
        title={message}
        position="bottom"
        arrow={true}
        animation="shift"
        duration="200"
      >
        <ResultItem color={itemColor}>
          <ResultIcon>{icon}</ResultIcon>
          <ResultName>
            {link ? (
              <OutboundLink
                to={link}
                eventLabel={link.split('/')[2]}
                target="_blank"
              >
                {content}
              </OutboundLink>
            ) : (
              content
            )}
          </ResultName>
          {availability === true ? (
            <AvailableIcon>
              <IoIosFlash />{' '}
            </AvailableIcon>
          ) : null}
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: Error, errorInfo: any) {
    if (error instanceof APIError || error instanceof NotFoundError) {
      return;
    }
    sendError(error, errorInfo).then((eventId) => {
      this.setState({eventId});
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ResultContainer>
          <Tooltip
            title={`${this.state.message}${
              this.state.eventId ? ` (${this.state.eventId})` : ''
            }`}
            position="bottom"
            arrow={true}
            animation="shift"
            duration="200"
          >
            <ResultItem color={COLORS.error}>
              <ResultIcon>
                <GoInfo />
              </ResultIcon>
              <ResultName>Error</ResultName>
            </ResultItem>
          </Tooltip>
        </ResultContainer>
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
      }
    >
      {children}
    </Suspense>
  </ErrorBoundary>
);

const CardContainer = styled.div`
  padding: 40px;
  font-size: 1rem;
  line-height: 1rem;

  ${mobile} {
    margin-bottom: 40px;
    padding: 0px;
  }
`;

const CardTitle = styled.div`
  margin-bottom: 15px;
  font-size: 1em;
  font-weight: bold;

  ${mobile} {
    padding: 0 20px;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const CardContent = styled.div`
  border-radius: 2px;

  ${mobile} {
    padding: 20px;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
    background: white;
    border-radius: 0;
    font-size: 1.2em;
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
  padding: 4px 0;
`;

export const ResultIcon = styled.div`
  width: 1em;
`;

export const ResultItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  word-break: break-all;
  color: ${({color}) => color};
`;

export const ResultName = styled.div`
  margin-left: 6px;
  font-family: monospace;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const AvailableIcon = styled.div`
  margin-top: 2px;
  margin-left: 3px;
  padding: 0;
  width: 15px;
  text-align: center;
  font-size: 13px;
  height: 15px;
`;
