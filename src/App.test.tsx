import { render } from '@testing-library/react';
import 'mutationobserver-shim';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

it('renders welcome message', async () => {
  const { findByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <Router>
        <App />
      </Router>
    </Suspense>
  );
  const text = await findByText('Grab a slick name for your new app');
  expect(text).toBeTruthy();
});
