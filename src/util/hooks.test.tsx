import { render, waitFor } from '@testing-library/react'
import 'mutationobserver-shim'
import React from 'react'
import { useDeferredState } from './hooks'

const App: React.FC = () => {
  const [value, setValue] = useDeferredState(500, 0)
  React.useEffect(() => {
    setValue(1)
    setValue(2)
    setValue(3)
  }, [setValue])
  return <div data-testid="root">{value}</div>
}

it('provoke state flow after certain time passed', async () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('root').textContent).toBe('0')
  await waitFor(() => {
    expect(getByTestId('root').textContent).toBe('3')
  })
})
