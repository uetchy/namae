import { StoreProvider } from 'easy-peasy';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { initSentry } from './util/analytics';
import { initCrisp } from './util/crisp';
import './util/i18n';
import { FullScreenSuspense } from './util/suspense';

initSentry();
initCrisp();

ReactDOM.render(
  <StoreProvider store={store}>
    <FullScreenSuspense>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FullScreenSuspense>
    <ToastContainer />
  </StoreProvider>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: (registration) => {
    console.log('Update available');

    toast.success('New version available! Click here to update.', {
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
