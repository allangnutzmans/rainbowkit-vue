import { ref, computed, watchEffect } from 'vue';
import { i18n, setLocale, type Locale } from '../../locales';
import { detectedBrowserLocale } from '../../utils/locale';

const currentLocale = ref<Locale | undefined>(undefined);
const updateCount = ref(0);

// Atualiza updateCount quando i18n muda
let unsubscribe: (() => void) | undefined;
if (typeof window !== 'undefined') {
  unsubscribe = i18n.onChange(() => {
    updateCount.value++;
  });
}

// Detecta locale do navegador se não definido
const browserLocale = computed(() => detectedBrowserLocale() as Locale);

watchEffect(() => {
  if (currentLocale.value && currentLocale.value !== i18n.locale) {
    setLocale(currentLocale.value);
  } else if (!currentLocale.value && browserLocale.value && browserLocale.value !== i18n.locale) {
    setLocale(browserLocale.value);
  }
});

export function useI18nContext() {
  const t = (key: string, options?: any) => i18n.t(key, options);
  return {
    i18n,
    t,
    locale: currentLocale,
    setLocale: (locale: Locale) => (currentLocale.value = locale),
    reset: () => {
      currentLocale.value = undefined;
      setLocale('en-US');
    },
  };
} 