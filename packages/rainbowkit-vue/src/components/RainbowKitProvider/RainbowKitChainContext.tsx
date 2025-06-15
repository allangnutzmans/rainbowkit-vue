import { provide, inject, reactive } from 'vue';
import { useConfig } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { provideRainbowKitChains } from './provideRainbowKitChains';

export interface RainbowKitChain extends Chain {
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
}

const RainbowKitChainContextKey = Symbol('RainbowKitChainContext');

export function provideRainbowKitChainContext({ chains = [], initialChain }) {
  const value = reactive({
    chains,
    initialChainId: typeof initialChain === 'number' ? initialChain : initialChain?.id,
  });
  provide(RainbowKitChainContextKey, value);
}

export function useRainbowKitChainContext() {
  return inject(RainbowKitChainContextKey, { chains: [], initialChainId: undefined });
}

export function RainbowKitChainProvider({
  children,
  initialChain,
}: {
  children: React.ReactNode;
  initialChain?: Chain | number;
}) {
  const { chains } = useConfig();

  return (
    <RainbowKitChainContext.Provider
      value={reactive({
        chains: provideRainbowKitChains(chains),
        initialChainId:
          typeof initialChain === 'number' ? initialChain : initialChain?.id,
      })}
    >
      {children}
    </RainbowKitChainContext.Provider>
  );
}

export const useRainbowKitChains = () =>
  useRainbowKitChainContext().chains;

export const useInitialChainId = () =>
  useRainbowKitChainContext().initialChainId;

export const useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();

  return reactive({
    chainsById: rainbowkitChains.reduce((acc, rkChain) => {
      acc[rkChain.id] = rkChain;
      return acc;
    }, {} as Record<number, RainbowKitChain>),
  });
};
