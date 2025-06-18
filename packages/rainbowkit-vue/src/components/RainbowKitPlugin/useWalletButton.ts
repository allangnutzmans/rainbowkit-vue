import { ref, Ref } from 'vue';
import type { WalletConnector } from '../../wallets/useWalletConnectors';

const connector: Ref<WalletConnector | null> = ref(null);

interface UseWalletButton {
  connector: Ref<WalletConnector | null>;
  setConnector: (wallet: WalletConnector | null) => void;
  reset: () => void;
}

export function useWalletButton(): UseWalletButton {
  return {
    connector,
    setConnector: (wallet: WalletConnector | null) => (connector.value = wallet),
    reset: () => (connector.value = null),
  };
} 