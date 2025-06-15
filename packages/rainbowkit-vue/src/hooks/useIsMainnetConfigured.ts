import { mainnet } from 'viem/chains';
import { useRainbowKitChains } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { computed, Ref } from 'vue';

export function useIsMainnetConfigured() {
  const rainbowKitChains = useRainbowKitChains() as unknown as Ref<any[]>;
  const chainId = mainnet.id;
  return computed(() =>
    rainbowKitChains.value.some(
      (rainbowKitChain: any) => rainbowKitChain.id === chainId,
    ),
  );
}
