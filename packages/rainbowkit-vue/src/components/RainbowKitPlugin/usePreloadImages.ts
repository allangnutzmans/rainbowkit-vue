import { onMounted, watch } from 'vue';
import { isMobile } from '../../utils/isMobile';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { loadImages } from '../AsyncImage/useAsyncImage';
import preloadAssetsIcon from '../Icons/AssetsIcon.vue';
import preloadLoginIcon from '../Icons/LoginIcon.vue';
import { useAuthenticationStatus } from './useAuthentication';
import { signInIcon } from './../Icons/signInIcon.vue';
import { useRainbowKitChain } from './useRainbowKitChainContext';

export function usePreloadImages() {
  const rainbowKitChains = useRainbowKitChain();
  const walletConnectors = useWalletConnectors();
  const authenticationStatus = useAuthenticationStatus();
  const isUnauthenticated = authenticationStatus === 'unauthenticated';

  function preloadImages() {
    loadImages(
      ...walletConnectors.map((wallet) => wallet.iconUrl),
      ...rainbowKitChains.map((chain: any) => chain.iconUrl).filter(isNotNullish),
    );

    // Preload illustrations used on desktop
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }

    if (isUnauthenticated) {
      //loadImages(signInIcon); TODO CKECK THIS HOOK
    }
  }

  onMounted(preloadImages);
  watch([
    () => walletConnectors,
    () => rainbowKitChains,
    () => authenticationStatus,
  ], preloadImages);
}
