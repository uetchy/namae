import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';

const isProduction = process.env.NODE_ENV !== 'development';

export function initGA(): void {
  if (isProduction) {
    ReactGA.initialize('UA-28919359-15');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}

export function sendQueryStatistics(queryLength: number): void {
  if (isProduction) {
    ReactGA.event({
      category: 'Search',
      action: 'New search invoked',
      value: queryLength,
    });
  }
}

export function initSentry(): void {
  if (isProduction) {
    Sentry.init({
      dsn: 'https://7ab2df74aead499b950ebef190cc40b7@sentry.io/1759299',
    });
  }
}

export function sendError(
  error: Error,
  errorInfo: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
): Promise<string> {
  return new Promise((resolve) => {
    if (isProduction) {
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        resolve(eventId);
      });
    }
  });
}
