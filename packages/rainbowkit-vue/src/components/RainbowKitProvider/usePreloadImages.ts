import { onMounted } from 'vue';
import { isMobile } from '../../utils/isMobile';
import { isNotNullish } from '../../utils/isNotNullish';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';
import { loadImages } from '../AsyncImage/useAsyncImage';
import { preloadAssetsIcon } from '../Icons/Assets';
import { preloadLoginIcon } from '../Icons/Login';
import { useAuthenticationStatus } from '../RainbowKitProvider/AuthenticationContext';
import { signInIcon } from './../SignIn/SignIn';
import { useRainbowKitChains } from './RainbowKitChainContext';

export function usePreloadImages() {
  const rainbowKitChains = useRainbowKitChains();
  const walletConnectors = useWalletConnectors();
  const isUnauthenticated = useAuthenticationStatus() === 'unauthenticated';

  onMounted(() => {
    // TODO: Replace with real logic
    // loadImages(...walletConnectors.map((wallet) => wallet.iconUrl), ...rainbowKitChains.map((chain) => chain.iconUrl).filter(isNotNullish));
    // if (!isMobile()) { preloadAssetsIcon(); preloadLoginIcon(); }
    // if (isUnauthenticated) { loadImages(signInIcon); }
  });
}
