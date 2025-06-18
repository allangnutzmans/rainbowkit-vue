import { ref, computed } from 'vue';
import { largeScreenMinWidth } from '../../css/sprinkles.css';
import { useWindowSize } from '../../composables/useWindowSize';
// Supondo que já exista um composable useWalletButton para acessar o connector global
import { useWalletButton } from './useWalletButton';

export const ModalSizeOptions = {
  COMPACT: 'compact',
  WIDE: 'wide',
} as const;

export type ModalSizes = (typeof ModalSizeOptions)[keyof typeof ModalSizeOptions];

const modalSize = ref<ModalSizes>(ModalSizeOptions.WIDE);

export function useModalSize() {
  const windowSize = useWindowSize();
  const { connector } = useWalletButton();
  const isSmallScreen = computed(() =>
    windowSize.value.width !== undefined && windowSize.value.width < largeScreenMinWidth
  );
  const currentModalSize = computed<ModalSizes>(() =>
    isSmallScreen.value || connector.value ? ModalSizeOptions.COMPACT : modalSize.value
  );
  return {
    modalSize: currentModalSize,
    setModalSize: (size: ModalSizes) => (modalSize.value = size),
    reset: () => (modalSize.value = ModalSizeOptions.WIDE),
  };
} 