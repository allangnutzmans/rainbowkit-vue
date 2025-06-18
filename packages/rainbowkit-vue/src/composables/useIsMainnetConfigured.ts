import { mainnet } from 'viem/chains';
import { useRainbowKitChain } from '../components/RainbowKitPlugin/useRainbowKitChainContext';
import { computed } from 'vue';

export function useIsMainnetConfigured() {
  const rainbowKitChains = useRainbowKitChain();
  const chainId = mainnet.id;
  return computed(() =>
    rainbowKitChains.value.some(
      (rainbowKitChain: any) => rainbowKitChain.id === chainId,
    ),
  );
}
