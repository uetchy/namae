import { capitalize } from './text'

it('capitalize text', () => {
  expect(capitalize('test')).toEqual('Test')
  expect(capitalize('Test')).toEqual('Test')
  expect(capitalize('tEST')).toEqual('Test')
  expect(capitalize('TEST')).toEqual('Test')
  expect(capitalize('')).toEqual('')
})
