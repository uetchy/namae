export function isStandalone() {
  return 'standalone' in window.navigator && window.navigator.standalone
}
