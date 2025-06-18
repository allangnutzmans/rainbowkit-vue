import { ref, computed } from 'vue';
import type { Chain } from 'wagmi/chains';
import { provideRainbowKitChains } from './provideRainbowKitChains';

export interface RainbowKitChain extends Chain {
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

const chains = ref<RainbowKitChain[]>([]);
const initialChainId = ref<number | undefined>(undefined);

export function setRainbowKitChains(newChains: Chain[], initialChain?: Chain | number) {
  if (newChains.length > 0) {
    chains.value = provideRainbowKitChains(newChains as [RainbowKitChain, ...RainbowKitChain[]]);
  } else {
    chains.value = [];
  }
  initialChainId.value = typeof initialChain === 'number' ? initialChain : initialChain?.id;
}

export function useRainbowKitChain() {
  return chains;
}

export function useInitialChainId() {
  return initialChainId.value;
}

export function useRainbowKitChainsById() {
  return computed(() => {
    const byId: Record<number, RainbowKitChain> = {};
    for (const chain of chains.value) {
      byId[chain.id] = chain;
    }
    return byId;
  });
} 