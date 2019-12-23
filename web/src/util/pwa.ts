interface CustomNavigator extends Navigator {
  standalone?: boolean;
}

export function isStandalone(): boolean {
  const navigator: CustomNavigator = window.navigator;
  return 'standalone' in navigator && navigator.standalone === true;
}
