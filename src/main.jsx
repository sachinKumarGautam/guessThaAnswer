import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import App from './App';
import { ServerDataProvider } from './state/serverDataContext';

import './styles/index.scss';

//@ts-ignore
const serverData = window.__SERVER_DATA__;

Sentry.init({
  dsn:
    'https://fbaddd285d4f4e59973fb1eda0ab24ee@o1168238.ingest.sentry.io/6260001',
  integrations: [new BrowserTracing()],
  debug: false,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

export const main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <ServerDataProvider value={serverData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ServerDataProvider>,
      document.getElementById('root')
    );
  });
};
