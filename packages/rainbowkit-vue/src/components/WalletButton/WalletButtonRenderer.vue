<script setup lang="ts">
import { ref, computed, watch, onMounted, provide, inject } from 'vue';
import { useAccount } from 'wagmi';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { isMobile } from '../../utils/isMobile';
import { addLatestWalletId, clearLatestWalletId, getLatestWalletId } from '../../wallets/latestWalletId';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { useConnectModal, useModalState } from '../RainbowKitProvider/ModalContext';
import { WalletButtonContextKey } from '../RainbowKitProvider/WalletButtonContext';

const props = defineProps<{
  wallet?: string;
}>();

const walletId = computed(() => (props.wallet ?? 'rainbow').toLowerCase());
const { openConnectModal } = useConnectModal();
const { connectModalOpen } = useModalState();
const walletButtonContext = inject(WalletButtonContextKey, null);
const connectors = useWalletConnectors();
const firstConnector = computed(() =>
  connectors
    .filter(wallet => wallet.isRainbowKitConnector)
    .filter(wallet => wallet.id.toLowerCase() === walletId.value)
    .sort((a, b) => a.groupIndex - b.groupIndex)[0]
);

if (!firstConnector.value) {
  throw new Error('Connector not found');
}

const connectionStatus = useConnectionStatus();
const loading = ref(false);
const isError = ref(false);
const mobile = isMobile();

watch(connectModalOpen, (open) => {
  if (!open && walletButtonContext?.connector) walletButtonContext.setConnector(null);
});

const { isConnected, isConnecting } = useAccount();

watch(isConnected, (val) => {
  if (val && isError.value) isError.value = false;
});

const isLastWalletIdConnected = computed(() => {
  const lastWalletId = getLatestWalletId();
  if (!lastWalletId || !firstConnector.value?.id) return false;
  if (!isConnected.value) return false;
  return lastWalletId === firstConnector.value.id;
});

const connectWallet = async () => {
  try {
    loading.value = true;
    if (isError.value) isError.value = false;
    await firstConnector.value?.connect?.();
  } catch {
    isError.value = true;
  } finally {
    loading.value = false;
  }
};

const isStatusLoading = computed(() => connectionStatus.value === 'loading');
const ready = computed(() =>
  !isConnecting.value && !!openConnectModal && firstConnector.value && !isStatusLoading.value
);
const isNotSupported = computed(() =>
  !firstConnector.value?.installed || !firstConnector.value?.ready
);

function connect() {
  addLatestWalletId(firstConnector.value?.id || '');
  if (mobile || isNotSupported.value) {
    openConnectModal?.();
    walletButtonContext?.setConnector(firstConnector.value);
    return;
  }
  return connectWallet();
}
</script>

<template>
  <slot
    :error="isError"
    :loading="loading"
    :connected="isLastWalletIdConnected"
    :ready="ready"
    :connector="firstConnector"
    :connect="connect"
  />
</template> 