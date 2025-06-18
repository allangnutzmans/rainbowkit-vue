import { ref, computed, watch, Ref } from 'vue';
import { useAccount } from '@wagmi/vue';
import { useConnectionStatus } from '../../composables/useConnectionStatus';
import { useAuthenticationStatus } from './useAuthentication';
import { useRainbowKitChain } from './useRainbowKitChainContext';

const accountModalOpen = ref(false);
const chainModalOpen = ref(false);
const connectModalOpen = ref(false);
const isWalletConnectModalOpen = ref(false);

function openAccountModal() {
  accountModalOpen.value = true;
}
function closeAccountModal() {
  accountModalOpen.value = false;
}
function openChainModal() {
  chainModalOpen.value = true;
}
function closeChainModal() {
  chainModalOpen.value = false;
}
function openConnectModal() {
  connectModalOpen.value = true;
}
function closeConnectModal() {
  connectModalOpen.value = false;
}
function setIsWalletConnectModalOpen(val: boolean) {
  isWalletConnectModalOpen.value = val;
}

function setupModalWatchers(connectionStatus: Ref<any>, isUnauthenticated: Ref<any>) {
  // Fechar modais ao conectar/desconectar
  watch(
    () => connectionStatus.value,
    (status, prev) => {
      if (status === 'connected') {
        closeModals({ keepConnectModalOpen: isUnauthenticated.value });
      } else if (status === 'disconnected') {
        closeModals();
      }
    }
  );

  // Fechar modais ao ficar não autenticado
  watch(isUnauthenticated, (unauth) => {
    if (unauth) closeModals();
  });
}

function closeModals({ keepConnectModalOpen = false } = {}) {
  if (!keepConnectModalOpen) closeConnectModal();
  closeAccountModal();
  closeChainModal();
}

export function useModal() {
  const connectionStatus = useConnectionStatus();
  const { chain } = useAccount();
  const rainbowKitChains = useRainbowKitChain();
  const authenticationStatus = useAuthenticationStatus();
  const getChainsArray = () => Array.isArray(rainbowKitChains) ? rainbowKitChains : (rainbowKitChains.value ?? []);
  const isCurrentChainSupported = computed(() =>
    getChainsArray().some((c: any) => c.id === chain.value?.id)
  );
  const isUnauthenticated = computed(() => authenticationStatus === 'unauthenticated');

  // Setup watchers (executa apenas uma vez por chamada)
  setupModalWatchers(connectionStatus, isUnauthenticated);

  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen,
    isWalletConnectModalOpen,
    openAccountModal: computed(() =>
      isCurrentChainSupported.value && connectionStatus.value === 'connected'
        ? openAccountModal
        : undefined
    ),
    openChainModal: computed(() =>
      connectionStatus.value === 'connected' ? openChainModal : undefined
    ),
    openConnectModal: computed(() =>
      connectionStatus.value === 'disconnected' || connectionStatus.value === 'unauthenticated'
        ? openConnectModal
        : undefined
    ),
    setIsWalletConnectModalOpen,
    closeAccountModal,
    closeChainModal,
    closeConnectModal,
    closeModals,
  };
}

export function useModalState() {
  const modal = useModal();
  return {
    accountModalOpen: modal.accountModalOpen,
    chainModalOpen: modal.chainModalOpen,
    connectModalOpen: modal.connectModalOpen,
  };
}

export function useAccountModal() {
  const modal = useModal();
  return { accountModalOpen: modal.accountModalOpen, openAccountModal: modal.openAccountModal };
}

export function useChainModal() {
  const modal = useModal();
  return { chainModalOpen: modal.chainModalOpen, openChainModal: modal.openChainModal };
}

export function useWalletConnectOpenState() {
  const modal = useModal();
  return {
    isWalletConnectModalOpen: modal.isWalletConnectModalOpen,
    setIsWalletConnectModalOpen: modal.setIsWalletConnectModalOpen,
  };
}

export function useConnectModal() {
  const modal = useModal();
  return {
    connectModalOpen: computed(() => modal.connectModalOpen.value || modal.isWalletConnectModalOpen.value),
    openConnectModal: modal.openConnectModal,
  };
} 