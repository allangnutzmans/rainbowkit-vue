import { onMounted } from 'vue';

const storageKey = 'rk-version';

function setRainbowKitVersion({ version }: { version: string }) {
  localStorage.setItem(storageKey, version);
}

export function useFingerprint() {
  onMounted(() => {
    setRainbowKitVersion({ version: '__buildVersion' });
  });
}
