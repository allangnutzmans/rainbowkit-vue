import { computed } from 'vue';
import {useAccount} from "@wagmi/vue";

export function useChainId() {
  const { chain: activeChain } = useAccount();
  return computed(() => activeChain.value?.id ?? null);
}
