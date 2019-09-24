import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {FullScreenSuspense} from './util/suspense';
import {initGA, initSentry} from './util/analytics';
import './util/i18n';

initGA();
initSentry();

ReactDOM.render(
  <FullScreenSuspense>
    <App />
  </FullScreenSuspense>,
  document.getElementById('root'),
);

serviceWorker.register({});
