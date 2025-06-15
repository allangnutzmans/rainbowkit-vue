import { provide, inject, ref } from 'vue';
import { largeScreenMinWidth } from '../../css/sprinkles.css';
import { useWindowSize } from '../../hooks/useWindowSize';
import { WalletButtonContext } from './WalletButtonContext';

export const ModalSizeOptions = {
  COMPACT: 'compact',
  WIDE: 'wide',
} as const;

const ModalSizeContextKey = Symbol('ModalSizeContext');

export function provideModalSizeContext(modalSize = ModalSizeOptions.WIDE) {
  const modalSizeRef = ref(modalSize);
  provide(ModalSizeContextKey, modalSizeRef);
}

export function useModalSizeContext() {
  return inject(ModalSizeContextKey, ref(ModalSizeOptions.WIDE));
}

interface ModalSizeProviderProps {
  children: ReactNode;
  modalSize: ModalSizes;
}

export function ModalSizeProvider({
  children,
  modalSize,
}: ModalSizeProviderProps) {
  const { width } = useWindowSize();
  const isSmallScreen = width && width < largeScreenMinWidth;
  const { connector } = useContext(WalletButtonContext);

  return (
    <ModalSizeContext.Provider
      value={isSmallScreen || connector ? ModalSizeOptions.COMPACT : modalSize}
    >
      {children}
    </ModalSizeContext.Provider>
  );
}
