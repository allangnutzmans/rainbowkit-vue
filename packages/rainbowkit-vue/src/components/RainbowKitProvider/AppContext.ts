import { provide, inject, reactive } from 'vue';

export type DisclaimerComponent = {
  Text: any;
  Link: any;
};

export const defaultAppInfo = {
  appName: undefined,
  disclaimer: undefined,
  learnMoreUrl:
    'https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore',
};

const AppContextKey = Symbol('AppContext');

export function provideAppContext(value = defaultAppInfo) {
  provide(AppContextKey, reactive(value));
}

export function useAppContext() {
  const ctx = inject(AppContextKey, reactive(defaultAppInfo));
  return ctx;
}
