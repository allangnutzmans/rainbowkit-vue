import { getPublicClient } from '@wagmi/core';
import { config } from '../../wagmiConfig';

export function usePublicClient() {
  return getPublicClient(config);
} 