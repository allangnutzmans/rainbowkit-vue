<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { mapResponsiveValue, normalizeResponsiveValue } from '../../css/sprinkles.css';
import { touchableStyles } from '../../css/touchableStyles';
import { useConnectionStatus } from '../../composables/useConnectionStatus';
import { isMobile } from '../../utils/isMobile';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import Avatar from '../Avatar/Avatar.vue';
import Box from '../Box/Box.vue';
import DropdownIcon from '../Icons/DropdownIcon.vue';
import { useI18nContext } from '../RainbowKitPlugin/useI18nContext';
import ConnectButtonRenderer from './ConnectButtonRenderer.vue';
import {useRainbowKitChain} from "../RainbowKitPlugin/useRainbowKitChainContext";

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

const props = withDefaults(defineProps<{
  accountStatus?: AccountStatus | Record<string, AccountStatus>;
  showBalance?: boolean | Record<string, boolean>;
  chainStatus?: ChainStatus | Record<string, ChainStatus>;
  label?: string;
}>(), {
  accountStatus: 'full',
  chainStatus: () => ({ largeScreen: 'full', smallScreen: 'icon' }),
  label: 'Connect Wallet',
  showBalance: () => ({ largeScreen: true, smallScreen: false }),
});

const chains = useRainbowKitChain();
const connectionStatus = useConnectionStatus();
const ready = ref(false);

const { i18n } = useI18nContext();

onMounted(() => {
  ready.value = true;
});
</script>

<template>
  {{ready ? 'true' : 'false'}}
  <pre>
    {{props}}
  </pre>
  <ConnectButtonRenderer v-if="ready">
    <template #default="{
      account,
      chain,
      mounted,
      openAccountModal,
      openChainModal,
      openConnectModal
    }">
      <Box
        display="flex"
        gap="12"
        v-bind="!mounted || connectionStatus === 'loading' ? {
          'aria-hidden': true,
          style: {
            opacity: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }
        } : {}"
      >
        <template v-if="mounted && account && connectionStatus === 'connected'">
          <template v-if="chain && (chains.length > 1 || chain.unsupported)">
            <Box
              alignItems="center"
              aria-label="Chain Selector"
              as="button"
              :background="chain.unsupported ? 'connectButtonBackgroundError' : 'connectButtonBackground'"
              borderRadius="connectButton"
              boxShadow="connectButton"
              :class="touchableStyles({ active: 'shrink', hover: 'grow' })"
              :color="chain.unsupported ? 'connectButtonTextError' : 'connectButtonText'"
              :display="mapResponsiveValue(props.chainStatus, value => value === 'none' ? 'none' : 'flex')"
              fontFamily="body"
              fontWeight="bold"
              gap="6"
              :key="chain.unsupported ? 'unsupported' : 'supported'"
              @click="openChainModal"
              paddingX="10"
              paddingY="8"
              :testId="chain.unsupported ? 'wrong-network-button' : 'chain-button'"
              transition="default"
              type="button"
            >
              <template v-if="chain.unsupported">
                <Box alignItems="center" display="flex" height="24" paddingX="4">
                  {{ i18n.t('connect_wallet.wrong_network.label') }}
                </Box>
              </template>
              <template v-else>
                <Box alignItems="center" display="flex" gap="6">
                  <Box
                    :display="mapResponsiveValue(props.chainStatus, value => value === 'full' || value === 'icon' ? 'block' : 'none')"
                    height="24"
                    width="24"
                  >
                    <AsyncImage
                      :alt="chain.name ?? 'Chain icon'"
                      :background="chain.iconBackground"
                      borderRadius="full"
                      height="24"
                      :src="chain.iconUrl"
                      width="24"
                    />
                  </Box>
                  <Box
                    :display="mapResponsiveValue(props.chainStatus, value => {
                      if (value === 'icon' && !chain.iconUrl) return 'block';
                      return value === 'full' || value === 'name' ? 'block' : 'none';
                    })"
                  >
                    {{ chain.name ?? chain.id }}
                  </Box>
                </Box>
              </template>
              <DropdownIcon />
            </Box>
          </template>
          <template v-if="!chain?.unsupported">
            <Box
              alignItems="center"
              as="button"
              background="connectButtonBackground"
              borderRadius="connectButton"
              boxShadow="connectButton"
              :class="touchableStyles({ active: 'shrink', hover: 'grow' })"
              color="connectButtonText"
              display="flex"
              fontFamily="body"
              fontWeight="bold"
              @click="openAccountModal"
              testId="account-button"
              transition="default"
              type="button"
            >
              <Box
                :display="mapResponsiveValue(props.showBalance, value => value ? 'block' : 'none')"
                padding="8"
                paddingLeft="12"
                v-if="account.displayBalance"
              >
                {{ account.displayBalance }}
              </Box>
              <Box
                :background="normalizeResponsiveValue(props.showBalance)[isMobile() ? 'smallScreen' : 'largeScreen'] ? 'connectButtonInnerBackground' : 'connectButtonBackground'"
                borderColor="connectButtonBackground"
                borderRadius="connectButton"
                borderStyle="solid"
                borderWidth="2"
                color="connectButtonText"
                fontFamily="body"
                fontWeight="bold"
                paddingX="8"
                paddingY="6"
                transition="default"
              >
                <Box alignItems="center" display="flex" gap="6" height="24">
                  <Box
                    :display="mapResponsiveValue(props.accountStatus, value => value === 'full' || value === 'avatar' ? 'block' : 'none')"
                  >
                    <Avatar
                      :address="account.address"
                      :imageUrl="account.ensAvatar"
                      :loading="account.hasPendingTransactions"
                      :size="24"
                    />
                  </Box>
                  <Box alignItems="center" display="flex" gap="6">
                    <Box
                      :display="mapResponsiveValue(props.accountStatus, value => value === 'full' || value === 'address' ? 'block' : 'none')"
                    >
                      {{ account.displayName }}
                    </Box>
                    <DropdownIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </template>
        </template>
        <template v-else>
          <Box
            as="button"
            background="accentColor"
            borderRadius="connectButton"
            boxShadow="connectButton"
            :class="touchableStyles({ active: 'shrink', hover: 'grow' })"
            color="accentColorForeground"
            fontFamily="body"
            fontWeight="bold"
            height="40"
            key="connect"
            @click="openConnectModal"
            paddingX="14"
            testId="connect-button"
            transition="default"
            type="button"
          >
            {{ mounted && props.label === 'Connect Wallet' ? i18n.t('connect_wallet.label') : props.label }}
          </Box>
        </template>
      </Box>
    </template>
  </ConnectButtonRenderer>
</template> 