interface CrispWindow extends Window {
  $crisp: any[];
  CRISP_WEBSITE_ID: string;
}
declare var window: CrispWindow;

export function initCrisp() {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = '92b2e096-6892-47dc-bf4a-057bad52d82e';
  const s = document.createElement('script');
  s.src = 'https://client.crisp.chat/l.js';
  s.async = true;
  document.getElementsByTagName('head')[0].appendChild(s);
}
