import { isStandalone } from './pwa';

it('recognize standalone mode', () => {
  expect(isStandalone()).toEqual(false);
});
