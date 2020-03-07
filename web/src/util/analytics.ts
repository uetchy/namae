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
      ReactGA.pageview(location.pathname + location.search);
    });
  }
  return history;
}

export function trackEvent({
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
  trackEvent({category: 'Search', action: 'Search New Word', label: query});
}

export function sendGettingStartedEvent(): void {
  trackEvent({category: 'Search', action: 'Getting Started'});
}

export function sendExpandEvent(): void {
  trackEvent({category: 'Result', action: 'Expand Card'});
}

export function sendAcceptSuggestionEvent(): void {
  trackEvent({category: 'Suggestion', action: 'Accept'});
}

export function sendShuffleSuggestionEvent(): void {
  trackEvent({category: 'Suggestion', action: 'Shuffle'});
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
