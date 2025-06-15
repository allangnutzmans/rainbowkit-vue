<script setup lang="ts">
import { computed, inject } from 'vue';
import { useAccount } from 'wagmi';
import { touchableStyles } from '../../css/touchableStyles';
import { useClearRecentTransactions } from '../../transactions/useClearRecentTransactions';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { chainToExplorerUrl } from '../../utils/chainToExplorerUrl';
import { isMobile } from '../../utils/isMobile';
import Box from '../Box/Box.vue';
import ExternalLinkIcon from '../Icons/ExternalLinkIcon.vue';
import Text from '../Text/Text.vue';
import TxItem from './TxItem.vue';

const NUMBER_OF_VISIBLE_TXS = 3;

const props = defineProps<{
  address: string;
}>();

const recentTransactions = useRecentTransactions();
const clearRecentTransactions = useClearRecentTransactions();
const { chain: activeChain } = useAccount();
const explorerLink = computed(() => chainToExplorerUrl(activeChain));
const visibleTxs = computed(() => recentTransactions.value.slice(0, NUMBER_OF_VISIBLE_TXS));
const hasTransactions = computed(() => visibleTxs.value.length > 0);
const mobile = isMobile();
const appName = inject('appName', undefined);
const i18n = inject('i18n', { t: (k: string, v?: any) => k });
</script>

<template>
  <Box
    display="flex"
    flexDirection="column"
    gap="10"
    paddingBottom="2"
    paddingTop="16"
    :paddingX="mobile ? '8' : '18'"
  >
    <template v-if="hasTransactions">
      <Box
        :paddingBottom="mobile ? '4' : '0'"
        paddingTop="8"
        :paddingX="mobile ? '12' : '6'"
      >
        <Box display="flex" justifyContent="space-between">
          <Text
            color="modalTextSecondary"
            :size="mobile ? '16' : '14'"
            weight="semibold"
          >
            {{ i18n.t('profile.transactions.recent.title') }}
          </Text>
          <Box
            :style="{
              marginBottom: -6,
              marginLeft: -10,
              marginRight: -10,
              marginTop: -6,
            }"
          >
            <Box
              as="button"
              :background="{ hover: 'profileForeground' }"
              borderRadius="actionButton"
              :class="touchableStyles({ active: 'shrink' })"
              @click="clearRecentTransactions"
              :paddingX="mobile ? '8' : '12'"
              :paddingY="mobile ? '4' : '5'"
              transition="default"
              type="button"
            >
              <Text
                color="modalTextSecondary"
                :size="mobile ? '16' : '14'"
                weight="semibold"
              >
                {{ i18n.t('profile.transactions.clear.label') }}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </template>
    <Box display="flex" flexDirection="column" gap="4">
      <template v-if="hasTransactions">
        <TxItem v-for="tx in visibleTxs" :key="tx.hash" :tx="tx" />
      </template>
      <template v-else>
        <Box :padding="mobile ? '12' : '8'">
          <Text
            color="modalTextDim"
            :size="mobile ? '16' : '14'"
            :weight="mobile ? 'medium' : 'bold'"
          >
            {{
              appName
                ? i18n.t('profile.transactions.description', { appName })
                : i18n.t('profile.transactions.description_fallback')
            }}
          </Text>
        </Box>
        <Box
          v-if="mobile"
          background="generalBorderDim"
          height="1"
          marginX="12"
          marginY="8"
        />
      </template>
    </Box>
  </Box>
  <Box v-if="explorerLink" paddingBottom="18" :paddingX="mobile ? '8' : '18'">
    <Box
      alignItems="center"
      as="a"
      :background="{ hover: 'profileForeground' }"
      borderRadius="menuButton"
      :class="touchableStyles({ active: 'shrink' })"
      color="modalTextDim"
      display="flex"
      flexDirection="row"
      :href="`${explorerLink}/address/${props.address}`"
      justifyContent="space-between"
      paddingX="8"
      paddingY="12"
      rel="noreferrer noopener"
      :style="{ willChange: 'transform' }"
      target="_blank"
      transition="default"
      width="full"
      :paddingLeft="mobile ? '12' : undefined"
    >
      <Text
        color="modalText"
        font="body"
        :size="mobile ? '16' : '14'"
        :weight="mobile ? 'semibold' : 'bold'"
      >
        {{ i18n.t('profile.explorer.label') }}
      </Text>
      <ExternalLinkIcon />
    </Box>
  </Box>
</template> 