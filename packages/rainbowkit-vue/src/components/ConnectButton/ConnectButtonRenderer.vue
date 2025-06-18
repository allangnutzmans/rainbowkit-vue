<script setup lang="ts">
import {computed, useSlots, inject, onMounted, ref, onUnmounted} from 'vue';
import { useAccount, useConfig } from '@wagmi/vue';
import { normalizeResponsiveValue } from '../../css/sprinkles.css';
import { useProfile } from '../../composables/useProfile';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { isMobile } from '../../utils/isMobile';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import { useAuthenticationStatus } from '../RainbowKitPlugin/useAuthentication';
import { useAccountModal, useChainModal, useConnectModal, useModalState } from '../RainbowKitPlugin/useModal';
import { useRainbowKitChainsById } from '../RainbowKitPlugin/useRainbowKitChainContext';
import { useShowBalance } from '../RainbowKitPlugin/useShowBalance';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';
import {showRecentTransactions} from "../../composables/useGlobal";

const slots = useSlots();

const { address, chainId } = useAccount();
const { chains: wagmiChains } = useConfig();
const isCurrentChainSupported = computed(() => wagmiChains.some(chain => chain.id === chainId.value));
const rainbowkitChainsById = useRainbowKitChainsById();
const authenticationStatus = useAuthenticationStatus() ?? undefined;
const rainbowKitChain = computed(() => chainId.value ? rainbowkitChainsById.value[chainId.value] : undefined);
const chainName = computed(() => rainbowKitChain.value?.name ?? undefined);
const chainIconUrl = computed(() => rainbowKitChain.value?.iconUrl ?? undefined);
const chainIconBackground = computed(() => rainbowKitChain.value?.iconBackground ?? undefined);
const resolvedChainIconUrl = useAsyncImage(chainIconUrl);

const hasPendingTransactions = computed(() =>
  useRecentTransactions().value.some(({ status }) => status === 'pending') && showRecentTransactions
);

const { showBalance } = useShowBalance();

function computeShouldShowBalance() {
  if (typeof showBalance.value === 'boolean') {
    return showBalance.value;
  }
  if (showBalance.value) {
    return normalizeResponsiveValue(showBalance.value)[isMobile() ? 'smallScreen' : 'largeScreen'];
  }
  return true;
}
const shouldShowBalance = computed(computeShouldShowBalance);

const { balance, ensAvatar, ensName } = useProfile({
  address: address.value,
  includeBalance: shouldShowBalance.value,
});

const displayBalance = computed(() =>
  balance?.value
    ? `${abbreviateETHBalance(Number.parseFloat(balance?.value.formatted))} ${balance.value.symbol}`
    : undefined
);

const { openConnectModal } = useConnectModal();
const { openChainModal } = useChainModal();
const { openAccountModal } = useAccountModal();
const { accountModalOpen, chainModalOpen, connectModalOpen } = useModalState();

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
})
onUnmounted(() => {
  isMounted.value = false;
})

const renderProps = computed(() => ({
  account: address.value
    ? {
        address: address.value,
        balanceDecimals: balance?.value?.decimals,
        balanceFormatted: balance?.value?.formatted,
        balanceSymbol: balance?.value?.symbol,
        displayBalance: displayBalance.value,
        displayName: ensName?.value ? formatENS(ensName?.value) : formatAddress(address.value),
        ensAvatar: ensAvatar?.value ?? undefined,
        ensName: ensName?.value ?? undefined,
        hasPendingTransactions: hasPendingTransactions.value,
      }
    : undefined,
  accountModalOpen: accountModalOpen.value,
  authenticationStatus: authenticationStatus,
  chain: chainId.value
    ? {
        hasIcon: Boolean(chainIconUrl.value),
        iconBackground: chainIconBackground.value,
        iconUrl: resolvedChainIconUrl.value,
        id: chainId.value,
        name: chainName.value,
        unsupported: !isCurrentChainSupported.value,
      }
    : undefined,
  chainModalOpen: chainModalOpen.value,
  connectModalOpen: connectModalOpen.value,
  mounted: isMounted.value,
  openAccountModal: openAccountModal ?? (() => {}),
  openChainModal: openChainModal ?? (() => {}),
  openConnectModal: openConnectModal ?? (() => {}),
}));
</script>

<template>
  <slot v-bind="renderProps" />
</template> 