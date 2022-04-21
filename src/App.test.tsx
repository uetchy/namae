import { render } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import 'mutationobserver-shim';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { store } from './store';
import { FullScreenSuspense } from './util/suspense';

it('renders welcome message', async () => {
  const { findByText } = render(
    <StoreProvider store={store}>
      <FullScreenSuspense>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FullScreenSuspense>
      <ToastContainer />
    </StoreProvider>
  );
  const text = await findByText('Grab a slick name for your new project');
  expect(text).toBeTruthy();
});
