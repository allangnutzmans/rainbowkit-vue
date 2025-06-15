import { provide, inject } from 'vue';

const ShowRecentTransactionsContextKey = Symbol('ShowRecentTransactionsContext');

export function provideShowRecentTransactionsContext(value = false) {
  provide(ShowRecentTransactionsContextKey, value);
}

export function useShowRecentTransactionsContext() {
  return inject(ShowRecentTransactionsContextKey, false);
}
