import type { Address } from 'viem';
import { useBalance } from '@wagmi/vue';
import { useMainnetEnsAvatar } from './useMainnetEnsAvatar';
import { useMainnetEnsName } from './useMainnetEnsName';
import { computed } from 'vue';

interface UseProfileParameters {
  address?: Address;
  includeBalance?: boolean;
}

export function useProfile({ address, includeBalance }: UseProfileParameters) {
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName.value);

  const { data: balance } = useBalance({
    address: computed(() => (includeBalance ? address : undefined)),
  });

/*  return computed(() => ({
    ensName: ensName.value,
    ensAvatar: ensAvatar.value,
    balance: balance.value,
  }));
  */
  return {
    ensName: ensName.value,
    ensAvatar: ensAvatar.value,
    balance: balance.value,
  };

}
