export { default as ConnectButton } from './components/ConnectButton/ConnectButton.vue';
export { default as WalletButton } from './components/WalletButton/WalletButton.vue';
export { default as RainbowKitPlugin } from './components/RainbowKitPlugin/RainbowKitPlugin';
export { getDefaultConfig } from './config/getDefaultConfig';
export { getDefaultWallets } from './wallets/getDefaultWallets';
export { getWalletConnectConnector } from './wallets/getWalletConnectConnector';
export { connectorsForWallets } from './wallets/connectorsForWallets';
export { useModal } from './components/RainbowKitPlugin/useModal';
export { useAddRecentTransaction } from './transactions/useAddRecentTransaction';
export {
  useAuthentication,
  createAuthenticationAdapter,
} from './components/RainbowKitPlugin/useAuthentication';
export type {
  Wallet,
  WalletList,
  WalletDetailsParams,
  RainbowKitWalletConnectParameters,
} from './wallets/Wallet';
export type { Theme } from './components/RainbowKitPlugin/RainbowKitPlugin';
export type {
  AuthenticationStatus,
  AuthenticationConfig,
} from './components/RainbowKitPlugin/useAuthentication';
export type { Locale } from './locales/';
export type { DisclaimerComponent } from './components/RainbowKitPlugin/useAppContext';
export type { RainbowKitChain as Chain } from './components/RainbowKitPlugin/useRainbowKitChainContext';
export { lightTheme } from './themes/lightTheme';
export { darkTheme } from './themes/darkTheme';
export { midnightTheme } from './themes/midnightTheme';
export { cssStringFromTheme } from './css/cssStringFromTheme';
export { cssObjectFromTheme } from './css/cssObjectFromTheme';
 