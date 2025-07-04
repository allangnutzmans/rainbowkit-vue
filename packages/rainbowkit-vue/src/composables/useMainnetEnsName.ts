import { useQuery } from '@tanstack/vue-query';
import type { Address } from 'viem';
import { useEnsName } from '@wagmi/vue';
import {mainnet} from "viem/chains";
import {
  ENHANCED_PROVIDER_ENABLED,
  enhancedProviderHttp,
} from '../core/network/enhancedProvider';
import { createQueryKey } from '../core/react-query/createQuery';
import { addEnsName, getEnsName } from '../utils/ens';
import { useIsMainnetConfigured } from './useIsMainnetConfigured';
import { computed } from 'vue';



async function getEnhancedProviderEnsName({ address }: { address: Address }) {
  const ensName = getEnsName(address);

  if (ensName) return ensName;

  const response = await enhancedProviderHttp.get<{
    data: Address | null;
  }>('/v1/resolve-ens', { params: { address } });

  const enhancedProviderEnsName = response.data.data;

  if (enhancedProviderEnsName) {
    addEnsName(address, enhancedProviderEnsName);
  }

  return enhancedProviderEnsName;
}

export function useMainnetEnsName(address?: Address) {
  const mainnetConfigured = useIsMainnetConfigured();

  // Fetch ens name if mainnet is configured
  const { data: ensName } = useEnsName({
    chainId: mainnet.id,
    address,
    query: {
      enabled: mainnetConfigured,
    },
  });

  // Fetch ens name from enhanced provider if mainnet isn't configured
  const { data: enhancedProviderEnsName } = useQuery({
    queryKey: createQueryKey('address', address),
    queryFn: () => getEnhancedProviderEnsName({ address: address! }),
    enabled: computed(
      () => !mainnetConfigured.value && !!address && ENHANCED_PROVIDER_ENABLED,
    ),
    staleTime: 10 * (60 * 1_000), // 10 minutes
    retry: 1, // Retry once before returning undefined if the request fails
  });

  return computed(() => ensName.value || enhancedProviderEnsName.value);
}
