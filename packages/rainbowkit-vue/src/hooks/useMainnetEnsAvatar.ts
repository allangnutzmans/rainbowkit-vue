import { type GetEnsNameReturnType, normalize } from 'viem/ens';
import { useEnsAvatar } from '@wagmi/vue';
import { mainnet } from 'vue-wagmi/chains';
import { useIsMainnetConfigured } from './useIsMainnetConfigured';
import { computed } from 'vue';

export function useMainnetEnsAvatar(name: GetEnsNameReturnType | undefined) {
  const mainnetConfigured = useIsMainnetConfigured();

  const safeNormalize = (ensName: string) => {
    try {
      return normalize(ensName);
    } catch {
      /* ignore */
    }
  };

  const { data: ensAvatar } = useEnsAvatar({
    chainId: mainnet.id,
    name: computed(() => (name ? safeNormalize(name) : undefined)),
    query: {
      enabled: mainnetConfigured,
    },
  });

  return ensAvatar;
}
