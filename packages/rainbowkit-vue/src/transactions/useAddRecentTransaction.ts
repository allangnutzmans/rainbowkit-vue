import { useAccount } from '@wagmi/vue';
import { useChainId } from '../composables/useChainId';
import { useTransactionStore } from './TransactionStoreContext';
import type { NewTransaction } from './transactionStore';

export function useAddRecentTransaction() {
  const store = useTransactionStore();
  const account = useAccount(); // Vue Query result
  const chainId = useChainId(); // likely a ref

  return (transaction: NewTransaction) => {
    const addr = account.address.value;
    const cid = typeof chainId === 'object' && 'value' in chainId ? chainId.value : chainId;

    if (!addr || !cid) {
      throw new Error('No address or chain ID found');
    }

    store.addTransaction(addr, cid, transaction);
  };
}
