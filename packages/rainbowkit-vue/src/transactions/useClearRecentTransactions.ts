import { useAccount } from '@wagmi/vue';
import { useChainId } from '../hooks/useChainId';
import { useTransactionStore } from './TransactionStoreContext';

export function useClearRecentTransactions() {
  const store = useTransactionStore();
  const account = useAccount();
  const chainId = useChainId();

  return () => {
    const addr = account.address.value;
    const cid = typeof chainId === 'object' && 'value' in chainId ? chainId.value : chainId;
    if (!addr || !cid) {
      throw new Error('No address or chain ID found');
    }
    store.clearTransactions(addr, cid);
  };
}
