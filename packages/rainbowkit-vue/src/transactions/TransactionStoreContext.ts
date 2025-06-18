import { provide, inject, ref, watch, onMounted, onUnmounted, Ref } from 'vue';
import type { PublicClient, TransactionReceipt } from 'viem';
import { useAccount, useBalance } from '@wagmi/vue';
import { useChainId } from '../composables/useChainId';
//import { usePublicClient } from '../composables/usePublicClient'; //TODO FIX THIS
import {
  type TransactionStore,
  createTransactionStore,
} from './transactionStore';
import {usePublicClient} from "wagmi";

// Only allow a single instance of the store to exist at once
// so that multiple RainbowKitProvider instances can share the same store.
// We delay the creation of the store until the first time it is used
// so that it always has access to a provider.
let storeSingleton: ReturnType<typeof createTransactionStore> | undefined;

const TransactionStoreSymbol = Symbol('TransactionStore');

export function provideTransactionStore() {
  const provider = ref(usePublicClient() as PublicClient);
  const { address } = useAccount();
  const chainId = useChainId();
  const { refetch } = useBalance({
    address,
    query: {
      enabled: false,
    },
  });

  // Use existing store if it exists, or lazily create one
  const store = ref<TransactionStore>(
    storeSingleton ?? (storeSingleton = createTransactionStore({ provider: provider.value }))
  );

  function onTransactionStatus(txStatus: TransactionReceipt['status']) {
    if (txStatus === 'success') refetch();
  }

  // Keep store provider up to date with any wagmi changes
  watch(provider, (newProvider) => {
    store.value.setProvider(newProvider);
  });

  // Wait for pending transactions whenever address or chainId changes
  watch([address, chainId], ([newAddress, newChainId]) => {
    if (newAddress && newChainId) {
      store.value.waitForPendingTransactions(newAddress, newChainId);
    }
  });

  // Listen for transaction status changes
  let off: (() => void) | undefined;
  onMounted(() => {
    if (store.value && address.value && chainId.value) {
      off = store.value.onTransactionStatus(onTransactionStatus);
    }
  });
  onUnmounted(() => {
    if (off) off();
  });

  provide(TransactionStoreSymbol, store);
}

export function useTransactionStore(): TransactionStore {
  const store = inject<Ref<TransactionStore>>(TransactionStoreSymbol);
  if (!store) {
    throw new Error('Transaction hooks must be used within RainbowKitProvider');
  }
  return store.value;
}
