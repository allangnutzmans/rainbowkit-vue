import { ref, watch } from 'vue';
import { useAccount } from '@wagmi/vue';
import { useChainId } from '../composables/useChainId';
import { useTransactionStore } from './TransactionStoreContext';
import type { Transaction } from './transactionStore';

export function useRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useChainId();
  const transactions = ref<Transaction[]>([]);

  const getAddr = () => (typeof address === 'object' && 'value' in address ? address.value : address);
  const getCid = () => (typeof chainId === 'object' && 'value' in chainId ? chainId.value : chainId);

  watch([address, chainId], ([newAddress, newChainId]) => {
    if (store && newAddress && newChainId) {
      transactions.value = store.getTransactions(newAddress, newChainId);
      if (typeof store.onChange === 'function') {
        store.onChange(() => {
          transactions.value = store.getTransactions(newAddress, newChainId);
        });
      }
    }
  }, { immediate: true });

  return transactions;
}
