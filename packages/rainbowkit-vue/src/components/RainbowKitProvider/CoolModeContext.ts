import { provide, inject } from 'vue';

const CoolModeContextKey = Symbol('CoolModeContext');

export function provideCoolModeContext(value = false) {
  provide(CoolModeContextKey, value);
}

export function useCoolModeContext() {
  return inject(CoolModeContextKey, false);
}
