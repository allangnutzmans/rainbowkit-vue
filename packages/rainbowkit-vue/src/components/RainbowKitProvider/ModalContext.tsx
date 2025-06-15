import { provide, inject, reactive } from 'vue';

const ModalContextKey = Symbol('ModalContext');

export function provideModalContext() {
  const state = reactive({
    accountModalOpen: false,
    chainModalOpen: false,
    connectModalOpen: false,
    isWalletConnectModalOpen: false,
  });
  const openAccountModal = () => (state.accountModalOpen = true);
  const closeAccountModal = () => (state.accountModalOpen = false);
  const openChainModal = () => (state.chainModalOpen = true);
  const closeChainModal = () => (state.chainModalOpen = false);
  const openConnectModal = () => (state.connectModalOpen = true);
  const closeConnectModal = () => (state.connectModalOpen = false);
  const setIsWalletConnectModalOpen = (val) => (state.isWalletConnectModalOpen = val);
  provide(ModalContextKey, {
    ...state,
    openAccountModal,
    closeAccountModal,
    openChainModal,
    closeChainModal,
    openConnectModal,
    closeConnectModal,
    setIsWalletConnectModalOpen,
  });
}

export function useModalContext() {
  return inject(ModalContextKey, {
    accountModalOpen: false,
    chainModalOpen: false,
    connectModalOpen: false,
    isWalletConnectModalOpen: false,
    openAccountModal: () => {},
    closeAccountModal: () => {},
    openChainModal: () => {},
    closeChainModal: () => {},
    openConnectModal: () => {},
    closeConnectModal: () => {},
    setIsWalletConnectModalOpen: () => {},
  });
}
