import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {FullScreenSuspense} from './util/suspense';
import {initGA, initSentry} from './util/analytics';
import {initCrisp} from './util/crip';
import './util/i18n';

import {BrowserRouter as Router} from 'react-router-dom';

initGA();
initSentry();
initCrisp();

ReactDOM.render(
  <FullScreenSuspense>
    <Router>
      <App />
    </Router>
  </FullScreenSuspense>,
  document.getElementById('root'),
);

serviceWorker.register({});
