import { ref, watch } from 'vue';
import type { Address } from 'viem';
import { useAccount } from '@wagmi/vue';

export type AuthenticationStatus =
  | 'loading'
  | 'unauthenticated'
  | 'authenticated';

export interface AuthenticationAdapter<Message> {
  getNonce: () => Promise<string>;
  createMessage: (args: {
    nonce: string;
    address: Address;
    chainId: number;
  }) => Message;
  verify: (args: { message: Message; signature: string }) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export interface AuthenticationConfig<Message> {
  adapter: AuthenticationAdapter<Message>;
  status: AuthenticationStatus;
}

export function createAuthenticationAdapter<Message>(
  adapter: AuthenticationAdapter<Message>,
) {
  return adapter;
}

// Singleton state
const _adapter = ref<AuthenticationAdapter<any> | null>(null);
const _status = ref<AuthenticationStatus>('loading');
const _enabled = ref(true);

// Used to track connector uid for logout logic
const _currentConnectorUid = ref<string | undefined>(undefined);

export function useAuthentication() {
  const { connector } = useAccount();

  // Watch for disconnect
  watch(
    () => connector.value,
    (newConnector, oldConnector) => {
      if (!newConnector && _adapter.value) {
        _adapter.value.signOut();
        _currentConnectorUid.value = undefined;
      }
    },
    { immediate: true }
  );

  // Watch for account change (connector uid)
  watch(
    [() => connector.value?.uid, _status],
    ([uid, status], [oldUid, oldStatus]) => {
      if (status === 'authenticated' && uid !== _currentConnectorUid.value && _adapter.value) {
        _currentConnectorUid.value = uid;
      }
      // If connector changes while authenticated, sign out
      if (
        status === 'authenticated' &&
        _currentConnectorUid.value &&
        uid !== _currentConnectorUid.value &&
        _adapter.value
      ) {
        _currentConnectorUid.value = undefined;
        _adapter.value.signOut();
      }
    },
    { immediate: true }
  );

  return {
    adapter: _adapter,
    status: _status,
    enabled: _enabled,
    setAdapter: (adapter: AuthenticationAdapter<any>) => (_adapter.value = adapter),
    setStatus: (status: AuthenticationStatus) => (_status.value = status),
    setEnabled: (enabled: boolean) => (_enabled.value = enabled),
    reset: () => {
      _adapter.value = null;
      _status.value = 'loading';
      _enabled.value = true;
      _currentConnectorUid.value = undefined;
    },
  };
}

export function useAuthenticationAdapter() {
  const { adapter } = useAuthentication();
  if (!adapter.value) {
    throw new Error('No authentication adapter found');
  }
  return adapter.value;
}

export function useAuthenticationStatus() {
  const { status } = useAuthentication();
  return status.value;
} 