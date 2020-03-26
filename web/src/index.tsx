import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {StoreProvider, createStore} from 'easy-peasy';
import {createBrowserHistory} from 'history';

import App from './App';
import * as serviceWorker from './serviceWorker';
import {FullScreenSuspense} from './util/suspense';
import {wrapHistoryWithGA, initSentry} from './util/analytics';
import {initCrisp} from './util/crip';
import {storeModel} from './store';
import './util/i18n';

initSentry();
initCrisp();

const store = createStore(storeModel);
const history = wrapHistoryWithGA(createBrowserHistory());
history.listen(() => {
  // reset stats counter
  store.getActions().stats.reset();
});

ReactDOM.render(
  <StoreProvider store={store}>
    <FullScreenSuspense>
      <Router history={history}>
        <App />
      </Router>
    </FullScreenSuspense>
  </StoreProvider>,
  document.getElementById('root'),
);

serviceWorker.register({
  onUpdate: (registration) => {
    console.log('New version available! Ready to update?');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({type: 'SKIP_WAITING'});
    }
    window.location.reload();
  },
});
