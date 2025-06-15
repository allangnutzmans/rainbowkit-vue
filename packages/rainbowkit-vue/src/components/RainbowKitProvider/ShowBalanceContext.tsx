import { provide, inject, ref } from 'vue';
import type { ResponsiveValue } from '../../css/sprinkles.css';

const ShowBalanceContextKey = Symbol('ShowBalanceContext');

export function provideShowBalanceContext() {
  const showBalance = ref(undefined);
  const setShowBalance = (val) => {
    showBalance.value = val;
  };
  provide(ShowBalanceContextKey, { showBalance, setShowBalance });
}

export function useShowBalanceContext() {
  return inject(ShowBalanceContextKey, {
    showBalance: ref(undefined),
    setShowBalance: () => {},
  });
}
