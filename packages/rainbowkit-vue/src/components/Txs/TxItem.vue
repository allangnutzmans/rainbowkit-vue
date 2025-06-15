<script setup lang="ts">
import { computed } from 'vue';
import { useAccount } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import type { Transaction } from '../../transactions/transactionStore';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import Box from '../Box/Box.vue';
import CancelIcon from '../Icons/CancelIcon.vue';
import ExternalLinkIcon from '../Icons/ExternalLinkIcon.vue';
import SpinnerIcon from '../Icons/Spinner.vue';
import SuccessIcon from '../Icons/SuccessIcon.vue';
import Text from '../Text/Text.vue';

const props = defineProps<{
  tx: Transaction;
}>();

const mobile = isMobile();
const { chain: activeChain } = useAccount();

const getTxStatusIcon = (status: Transaction['status']) => {
  switch (status) {
    case 'pending':
      return SpinnerIcon;
    case 'confirmed':
      return SuccessIcon;
    case 'failed':
      return CancelIcon;
    default:
      return SpinnerIcon;
  }
};

const Icon = computed(() => getTxStatusIcon(props.tx.status));
const color = computed(() => props.tx.status === 'failed' ? 'error' : 'accentColor');

const confirmationStatus = computed(() =>
  props.tx.status === 'confirmed'
    ? 'Confirmed'
    : props.tx.status === 'failed'
      ? 'Failed'
      : 'Pending'
);

const explorerLink = computed(() => chainToExplorerUrl(activeChain));
</script>

<template>
  <Box
    v-if="explorerLink"
    as="a"
    :background="{ hover: 'profileForeground' }"
    borderRadius="menuButton"
    :class="touchableStyles({ active: 'shrink' })"
    :href="`${explorerLink}/tx/${props.tx.hash}`"
    rel="noreferrer noopener"
    target="_blank"
    transition="default"
    color="modalText"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    padding="8"
    width="full"
  >
    <Box
      alignItems="center"
      display="flex"
      flexDirection="row"
      :gap="mobile ? '16' : '14'"
    >
      <Box :color="color">
        <component :is="Icon" />
      </Box>
      <Box display="flex" flexDirection="column" :gap="mobile ? '3' : '1'">
        <Box>
          <Text
            color="modalText"
            font="body"
            :size="mobile ? '16' : '14'"
            weight="bold"
          >
            {{ props.tx?.description }}
          </Text>
        </Box>
        <Box>
          <Text
            :color="props.tx.status === 'pending' ? 'modalTextSecondary' : color"
            font="body"
            size="14"
            :weight="mobile ? 'medium' : 'regular'"
          >
            {{ confirmationStatus }}
          </Text>
        </Box>
      </Box>
    </Box>
    <Box alignItems="center" color="modalTextDim" display="flex">
      <ExternalLinkIcon />
    </Box>
  </Box>
  <Box
    v-else
    color="modalText"
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    padding="8"
    width="full"
  >
    <Box
      alignItems="center"
      display="flex"
      flexDirection="row"
      :gap="mobile ? '16' : '14'"
    >
      <Box :color="color">
        <component :is="Icon" />
      </Box>
      <Box display="flex" flexDirection="column" :gap="mobile ? '3' : '1'">
        <Box>
          <Text
            color="modalText"
            font="body"
            :size="mobile ? '16' : '14'"
            weight="bold"
          >
            {{ props.tx?.description }}
          </Text>
        </Box>
        <Box>
          <Text
            :color="props.tx.status === 'pending' ? 'modalTextSecondary' : color"
            font="body"
            size="14"
            :weight="mobile ? 'medium' : 'regular'"
          >
            {{ confirmationStatus }}
          </Text>
        </Box>
      </Box>
    </Box>
  </Box>
</template> 