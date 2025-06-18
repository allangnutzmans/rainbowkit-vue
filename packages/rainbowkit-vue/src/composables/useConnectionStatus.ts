import { useAccount } from '@wagmi/vue';
import { useAuthenticationStatus } from '../components/RainbowKitPlugin/useAuthentication';
import { computed } from 'vue';

export type ConnectionStatus =
  | 'disconnected'
  | 'loading'
  | 'unauthenticated'
  | 'connected';

export function useConnectionStatus() {
  const authenticationStatus = useAuthenticationStatus();
  const { isConnected } = useAccount();

  return computed<ConnectionStatus>(() => {
    if (!isConnected) {
      return 'disconnected';
    }
    if (!authenticationStatus) {
      return 'connected';
    }
    if (
      authenticationStatus === 'loading' ||
      authenticationStatus === 'unauthenticated'
    ) {
      return authenticationStatus;
    }
    return 'connected';
  });
}
