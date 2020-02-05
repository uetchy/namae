import React, {Suspense} from 'react';
import {render, waitForElement} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

it('renders welcome message', async () => {
  const {getByText} = render(
    <Suspense fallback={<div>loading</div>}>
      <Router>
        <App />
      </Router>
    </Suspense>,
  );
  const text = await waitForElement(() => getByText('name new project'));
  expect(text).toBeTruthy();
});
