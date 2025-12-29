import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApp, defineComponent, h } from 'vue';
import RainbowKitPlugin from './RainbowKitPlugin';

// Mock all composables and dependencies
vi.mock('./useAppContext', () => ({
  useAppContext: () => ({
    setAppName: vi.fn(),
    setDisclaimer: vi.fn(),
    setLearnMoreUrl: vi.fn(),
  }),
}));
vi.mock('./useAvatar', () => ({
  useAvatar: () => ({ setAvatar: vi.fn() }),
}));
vi.mock('./useRainbowKitChainContext', () => ({
  setRainbowKitChains: vi.fn(),
}));
vi.mock('./usePreloadImages', () => ({
  usePreloadImages: vi.fn(),
}));
vi.mock('./useFingerprint', () => ({
  useFingerprint: vi.fn(),
}));
vi.mock('./useI18nContext', () => ({
  useI18nContext: () => ({ setLocale: vi.fn() }),
}));
vi.mock('./useModalSize', () => ({
  useModalSize: () => ({ setModalSize: vi.fn() }),
  ModalSizeOptions: { Default: 'default' },
}));
vi.mock('../../css/cssObjectFromTheme', () => ({
  cssObjectFromTheme: () => ({ '--test-var': 'theme-value' }),
}));
vi.mock('../../composables/useGlobal', () => ({
  showRecentTransactions: { value: false },
}));
vi.mock('../../config/getDefaultConfig', () => ({
  getDefaultConfig: vi.fn(() => ({ appInfo: {}, chains: [], theme: null })),
}));
vi.mock('viem/chains', () => ({ mainnet: {}, sepolia: {} }));
vi.mock('@wagmi/vue', () => ({ WagmiPlugin: { install: vi.fn() } }));
vi.mock('@tanstack/vue-query', () => ({ VueQueryPlugin: { install: vi.fn() }, QueryClient: vi.fn() }));

// Import the mocked composables for assertion
import { useAppContext } from './useAppContext';
import { useAvatar } from './useAvatar';
import { setRainbowKitChains } from './useRainbowKitChainContext';
import { useI18nContext } from './useI18nContext';
import { useModalSize } from './useModalSize';
import { showRecentTransactions } from '../../composables/useGlobal';

const DummyComponent = defineComponent({
  name: 'DummyComponent',
  setup() {
    return () => h('div', 'dummy');
  },
});

describe('RainbowKitPlugin', () => {
  let app: ReturnType<typeof createApp>;
  beforeEach(() => {
    app = createApp(DummyComponent);
    // Reset provides for each test
    app._context.provides = {};
    // Reset document style
    document.documentElement.style.setProperty('--test-var', '');
  });

  it('installs and sets global config', () => {
    const config = { appInfo: { appName: 'TestApp' }, chains: [1], theme: { some: 'theme' } };
    app.use(RainbowKitPlugin, { config });
    expect(app.config.globalProperties.$rainbowKitConfig).toBe(config);
  });

  it('applies theme CSS variables', () => {
    const config = { theme: { some: 'theme' } };
    app.use(RainbowKitPlugin, { config });
    // Simulate setup call
    const mixin = app._context.mixins?.[app._context.mixins.length - 1];
    const mockContext = { attrs: {}, slots: {}, emit: () => {}, expose: () => {} };
    mixin?.setup?.({}, mockContext);
    expect(document.documentElement.style.getPropertyValue('--test-var')).toBe('theme-value');
  });

  it('calls composables for appInfo, avatar, chains, locale, showRecentTransactions, modalSize', () => {
    const config = {
      appInfo: { appName: 'TestApp', disclaimer: 'Disclaimer', learnMoreUrl: 'url' },
      avatar: 'avatar',
      chains: [1],
      initialChain: 1,
      locale: 'en-US',
      showRecentTransactions: true,
      modalSize: 'default',
      theme: { some: 'theme' },
    };
    app.use(RainbowKitPlugin, { config });
    // Simulate setup call
    const mixin = app._context.mixins?.[app._context.mixins.length - 1];
    const mockContext = { attrs: {}, slots: {}, emit: () => {}, expose: () => {} };
    mixin?.setup?.({}, mockContext);
    // Check that all mocked composables were called
    expect(useAppContext().setAppName).toHaveBeenCalledWith('TestApp');
    expect(useAppContext().setDisclaimer).toHaveBeenCalledWith('Disclaimer');
    expect(useAppContext().setLearnMoreUrl).toHaveBeenCalledWith('url');
    expect(useAvatar().setAvatar).toHaveBeenCalledWith('avatar');
    expect(setRainbowKitChains).toHaveBeenCalledWith([1], 1);
    expect(useI18nContext().setLocale).toHaveBeenCalledWith('en-US');
    expect(useModalSize().setModalSize).toHaveBeenCalledWith('default');
    expect(showRecentTransactions.value).toBe(true);
  });
}); 