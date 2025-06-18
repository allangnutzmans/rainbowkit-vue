import { ref, computed } from 'vue';

export type DisclaimerComponent = {
  Text: (props: { children: any }) => any;
  Link: (props: { children: any; href: string }) => any;
};

const defaultAppInfo = {
  appName: undefined as string | undefined,
  disclaimer: undefined as DisclaimerComponent | undefined,
  learnMoreUrl:
    'https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore',
};

const appName = ref<string | undefined>(defaultAppInfo.appName);
const disclaimer = ref<DisclaimerComponent | undefined>(defaultAppInfo.disclaimer);
const learnMoreUrl = ref<string | undefined>(defaultAppInfo.learnMoreUrl);

export function useAppContext() {
  return {
    appName,
    disclaimer,
    learnMoreUrl,
    setAppName: (name?: string) => (appName.value = name),
    setDisclaimer: (d?: DisclaimerComponent) => (disclaimer.value = d),
    setLearnMoreUrl: (url?: string) => (learnMoreUrl.value = url),
    reset: () => {
      appName.value = defaultAppInfo.appName;
      disclaimer.value = defaultAppInfo.disclaimer;
      learnMoreUrl.value = defaultAppInfo.learnMoreUrl;
    },
  };
} 