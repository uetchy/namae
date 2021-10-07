import * as Sentry from '@sentry/browser';

const isProduction = process.env.NODE_ENV !== 'development';

declare namespace umami {
  var trackEvent: (
    value: string,
    type: string,
    url?: string,
    websiteId?: string
  ) => void;
}

export function trackEvent({
  value,
  type = 'custom',
}: {
  value: string;
  type?: string;
}) {
  if (isProduction) {
    umami.trackEvent(value, type);
  }
}

export function sendQueryEvent(query: string): void {
  trackEvent({ value: 'Invoke new search', type: 'search' });
}

export function sendGettingStartedEvent(): void {
  trackEvent({ value: 'Click getting started button', type: 'search' });
}

export function sendExpandEvent(): void {
  trackEvent({ value: 'Expand card', type: 'search' });
}

export function sendAcceptSuggestionEvent(): void {
  trackEvent({ value: 'Accept suggestion', type: 'suggest' });
}

export function sendShuffleSuggestionEvent(): void {
  trackEvent({ value: 'Shuffle suggestion', type: 'suggest' });
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
  }
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
