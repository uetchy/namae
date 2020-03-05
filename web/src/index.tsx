import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {FullScreenSuspense} from './util/suspense';
import {initHistoryWithGA, initSentry} from './util/analytics';
import {initCrisp} from './util/crip';
import './util/i18n';

initSentry();
initCrisp();

const history = initHistoryWithGA();

ReactDOM.render(
  <FullScreenSuspense>
    <Router history={history}>
      <App />
    </Router>
  </FullScreenSuspense>,
  document.getElementById('root'),
);

serviceWorker.register({});
