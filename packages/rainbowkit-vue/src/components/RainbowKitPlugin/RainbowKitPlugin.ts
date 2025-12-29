import { useAppContext } from './useAppContext';
import { useAvatar } from './useAvatar';
import { setRainbowKitChains } from './useRainbowKitChainContext';
import { usePreloadImages } from './usePreloadImages';
import { useFingerprint } from './useFingerprint';
import { useI18nContext } from './useI18nContext';
import type { ThemeVars } from '../../css/sprinkles.css';
import type { Locale } from '../../locales';
import { ModalSizeOptions, type ModalSizes } from './useModalSize';
import { getCurrentInstance } from 'vue';
import { showRecentTransactions as showRecentTransactionsRef } from '../../composables/useGlobal';
import { useModalSize } from './useModalSize';
import { cssObjectFromTheme } from '../../css/cssObjectFromTheme';
import { getDefaultConfig } from '../../config/getDefaultConfig';
import { mainnet, sepolia } from 'viem/chains';
import { WagmiPlugin } from '@wagmi/vue';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

export type Theme =
  | ThemeVars
  | {
      lightMode: ThemeVars;
      darkMode: ThemeVars;
    };

export interface RainbowKitOptions {
  initialChain?: any;
  chains?: any[];
  id?: string;
  theme?: Theme | null;
  showRecentTransactions?: boolean;
  appInfo?: any;
  coolMode?: boolean;
  avatar?: any;
  modalSize?: ModalSizes;
  locale?: Locale;
}

const RainbowKitPlugin = {
  install(app: any, options?: { config?: any }) {
    // Use provided config or fallback to default
    const config = options?.config || getDefaultConfig({
      appName: 'rainbowkit-vue',
      projectId: '6a6bc9ccada2df8d6c64e6bc29a2abbe',
      chains: [mainnet, sepolia],
    });

    if (!(window as any).__RAINBOWKIT_PLUGIN_INITIALIZED__) {
      app.use(RainbowKitPlugin, { config });
      (window as any).__RAINBOWKIT_PLUGIN_INITIALIZED__ = true;
    }

    // Install VueQueryPlugin with a default queryClient if not already installed
    if (!app._context.provides['VUE_QUERY_CLIENT']) {
      const queryClient = new QueryClient();
      app.use(VueQueryPlugin, { queryClient });
    }

    // Install WagmiPlugin with the same config if not already installed
    if (!app._context.provides['WagmiConfig']) {
      app.use(WagmiPlugin, { config });
    }

    app.config.globalProperties.$rainbowKitConfig = config;

    app.mixin({
      setup() {
        const cfg = getCurrentInstance()?.appContext.config.globalProperties.$rainbowKitConfig;
        if (!cfg) return;

        if (cfg.appInfo) {
          const { setAppName, setDisclaimer, setLearnMoreUrl } = useAppContext();
          if (cfg.appInfo.appName) setAppName(cfg.appInfo.appName);
          if (cfg.appInfo.disclaimer) setDisclaimer(cfg.appInfo.disclaimer);
          if (cfg.appInfo.learnMoreUrl) setLearnMoreUrl(cfg.appInfo.learnMoreUrl);
        }
        if (cfg.avatar) {
          const { setAvatar } = useAvatar();
          setAvatar(cfg.avatar);
        }
        if (cfg.initialChain && cfg.chains) {
          setRainbowKitChains(cfg.chains, cfg.initialChain);
        } else if (cfg.chains) {
          setRainbowKitChains(cfg.chains);
        }
        if (cfg.locale) {
          const { setLocale } = useI18nContext();
          setLocale(cfg.locale);
        }
        if (typeof cfg.showRecentTransactions === 'boolean') {
          showRecentTransactionsRef.value = cfg.showRecentTransactions;
        }
        if (cfg.modalSize) {
          const { setModalSize } = useModalSize();
          setModalSize(cfg.modalSize);
        }
        if (cfg.theme) {
          const themeVars = cssObjectFromTheme(cfg.theme);
          Object.entries(themeVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
          });
        }
        usePreloadImages();
        useFingerprint();
      }
    });


  },
};

export default RainbowKitPlugin;
export { ModalSizeOptions };
