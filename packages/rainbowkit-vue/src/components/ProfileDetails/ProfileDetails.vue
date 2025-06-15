<script setup lang="ts">
import { ref, computed, watch, h } from 'vue';
import Avatar from '../Avatar/Avatar.vue';
import Box from '../Box/Box.vue';
import CloseButton from '../CloseButton/CloseButton.vue';
import { abbreviateETHBalance } from '../ConnectButton/abbreviateETHBalance';
import { formatAddress } from '../ConnectButton/formatAddress';
import { formatENS } from '../ConnectButton/formatENS';
import CopiedIcon from '../Icons/CopiedIcon.vue';
import CopyIcon from '../Icons/CopyIcon.vue';
import DisconnectIcon from '../Icons/DisconnectIcon.vue';
import { useI18nContext } from '../RainbowKitProvider/useI18nContext';
import { useShowRecentTransactionsContext } from '../RainbowKitProvider/useShowRecentTransactionsContext';
import Text from '../Text/Text.vue';
import TxList from '../Txs/TxList.vue';
import ProfileDetailsAction from './ProfileDetailsAction.vue';
import { isMobile } from '../../utils/isMobile';

const props = defineProps<{
  address: string;
  ensAvatar?: string;
  ensName?: string;
  balance?: { formatted: string; symbol: string };
  onClose: () => void;
  onDisconnect: () => void;
}>();

const showRecentTransactions = useShowRecentTransactionsContext();
const copiedAddress = ref(false);
const i18n = useI18nContext();
const mobile = isMobile();

const accountName = computed(() =>
  props.ensName ? formatENS(props.ensName) : formatAddress(props.address)
);

const ethBalance = computed(() => props.balance?.formatted);
const displayBalance = computed(() =>
  ethBalance.value ? abbreviateETHBalance(Number.parseFloat(ethBalance.value)) : undefined
);

const titleId = 'rk_profile_title';

function copyAddressAction() {
  if (props.address) {
    navigator.clipboard.writeText(props.address);
    copiedAddress.value = true;
  }
}

watch(copiedAddress, (val) => {
  if (val) {
    const timer = setTimeout(() => {
      copiedAddress.value = false;
    }, 1500);
    return () => clearTimeout(timer);
  }
});
</script>

<template>
  <Box display="flex" flexDirection="column">
    <Box background="profileForeground" padding="16">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        :gap="mobile ? '16' : '12'"
        justifyContent="center"
        margin="8"
        :style="{ textAlign: 'center' }"
      >
        <Box
          :style="{
            position: 'absolute',
            right: '16px',
            top: '16px',
            willChange: 'transform',
          }"
        >
          <CloseButton :onClose="props.onClose" />
        </Box>
        <Box :marginTop="mobile ? '24' : '0'">
          <Avatar
            :address="props.address"
            :imageUrl="props.ensAvatar"
            :size="mobile ? 82 : 74"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          :gap="mobile ? '4' : '0'"
          textAlign="center"
        >
          <Box textAlign="center">
            <Text
              as="h1"
              color="modalText"
              :id="titleId"
              :size="mobile ? '20' : '18'"
              weight="heavy"
            >
              {{ accountName }}
            </Text>
          </Box>
          <Box v-if="props.balance" textAlign="center">
            <Text
              as="h1"
              color="modalTextSecondary"
              :id="titleId"
              :size="mobile ? '16' : '14'"
              weight="semibold"
            >
              {{ displayBalance }} {{ props.balance.symbol }}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap="8"
        margin="2"
        marginTop="16"
      >
        <ProfileDetailsAction
          :action="copyAddressAction"
          :icon="copiedAddress ? h(CopiedIcon) : h(CopyIcon)"
          :label="copiedAddress
            ? i18n.t('profile.copy_address.copied')
            : i18n.t('profile.copy_address.label')"
        />
        <ProfileDetailsAction
          :action="props.onDisconnect"
          :icon="h(DisconnectIcon)"
          :label="i18n.t('profile.disconnect.label')"
          testId="disconnect-button"
        />
      </Box>
    </Box>
    <template v-if="showRecentTransactions">
      <Box background="generalBorder" height="1" marginTop="-1" />
      <Box>
        <TxList :address="props.address" />
      </Box>
    </template>
  </Box>
</template> 