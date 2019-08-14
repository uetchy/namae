import React, { Suspense } from 'react'
import { render, waitForElement } from '@testing-library/react'

import App from './App'

it('renders welcome message', async () => {
  const { getByText } = render(
    <Suspense fallback={<div>loading</div>}>
      <App />
    </Suspense>
  )
  const text = await waitForElement(() => getByText('name new project'))
  expect(text).toBeTruthy()
})
