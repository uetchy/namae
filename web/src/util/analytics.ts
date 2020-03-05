import ReactGA from 'react-ga';
import * as Sentry from '@sentry/browser';
import {createBrowserHistory} from 'history';

const isProduction = process.env.NODE_ENV !== 'development';

export function initHistoryWithGA() {
  const history = createBrowserHistory();
  if (isProduction) {
    ReactGA.initialize('UA-28919359-15');
    ReactGA.pageview(window.location.pathname + window.location.search);
    history.listen((location) => {
      ReactGA.set({page: location.pathname});
      ReactGA.pageview(location.pathname);
    });
  }
  return history;
}

export function track({
  category,
  action,
  label = undefined,
  value = undefined,
}: {
  category: string;
  action: string;
  label?: string;
  value?: number;
}) {
  if (isProduction) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
}

export function sendQueryEvent(query: string): void {
  track({category: 'Search', action: 'search', label: query});
}

export function sendExampleQueryEvent(query: string): void {
  track({category: 'Search', action: 'tryExampleQuery', label: query});
}

export function sendExpandEvent(): void {
  track({category: 'Result', action: 'expand'});
}

export function sendAcceptSuggestionEvent(): void {
  track({category: 'Suggestion', action: 'accept'});
}

export function sendShuffleSuggestionEvent(): void {
  track({category: 'Suggestion', action: 'shuffle'});
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
