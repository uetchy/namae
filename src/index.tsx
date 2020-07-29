import { StoreProvider } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store, wrapHistoryWithStoreHandler } from './store';
import { initSentry, wrapHistoryWithGA } from './util/analytics';
import { compose } from './util/array';
import { initCrisp } from './util/crisp';
import './util/i18n';
import { FullScreenSuspense } from './util/suspense';

initSentry();
initCrisp();

const history = compose(
  createBrowserHistory(),
  wrapHistoryWithStoreHandler,
  wrapHistoryWithGA,
);

ReactDOM.render(
  <StoreProvider store={store}>
    <FullScreenSuspense>
      <Router history={history}>
        <App />
      </Router>
    </FullScreenSuspense>
    <ToastContainer />
  </StoreProvider>,
  document.getElementById('root'),
);

serviceWorker.register({
  onUpdate: (registration) => {
    console.log('Update available');

    toast.dark('New version available! Click here to update.', {
      onClose: () => {
        window.location.reload();
      },
      position: 'top-right',
      autoClose: false,
      closeButton: false,
      closeOnClick: true,
    });

    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  },
});
