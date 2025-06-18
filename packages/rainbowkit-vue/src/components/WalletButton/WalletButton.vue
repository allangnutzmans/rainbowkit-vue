<script setup lang="ts">
import { computed } from 'vue';
import { touchableStyles } from '../../css/touchableStyles';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import Box from '../Box/Box.vue';
import SpinnerIcon from '../Icons/Spinner.vue';
import { useI18nContext } from '../RainbowKitPlugin/useI18nContext';
import * as styles from './WalletButton.css';
import WalletButtonRenderer from './WalletButtonRenderer.vue';

const props = defineProps<{
  wallet?: string;
}>();

const i18n = useI18nContext();
</script>

<template>
  <WalletButtonRenderer :wallet="props.wallet">
    <template #default="{ ready, connect, connected, mounted, connector, loading }">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        :disabled="!ready || loading"
        :pointerEvents="!ready || loading ? 'none' : 'all'"
      >
        <Box
          as="button"
          borderRadius="menuButton"
          borderStyle="solid"
          borderWidth="1"
          :class="[styles.maxWidth, styles.border, touchableStyles({ active: 'shrink', hover: 'grow' })]"
          minHeight="44"
          @click="connect"
          :disabled="!ready || loading"
          padding="6"
          :style="{ willChange: 'transform' }"
          :testId="`wallet-button-${connector?.id || ''}`"
          transition="default"
          width="full"
          background="connectButtonBackground"
        >
          <Box
            color="modalText"
            fontFamily="body"
            fontSize="16"
            fontWeight="bold"
            transition="default"
            display="flex"
            alignItems="center"
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              gap="12"
              paddingRight="6"
            >
              <Box>
                <template v-if="loading">
                  <SpinnerIcon />
                </template>
                <template v-else>
                  <AsyncImage
                    :background="connector?.iconBackground"
                    borderRadius="6"
                    height="28"
                    :src="connector?.iconUrl"
                    width="28"
                  />
                </template>
              </Box>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                color="modalText"
              >
                <Box :testId="`wallet-button-label-${connector?.id || ''}`">
                  {{
                    loading
                      ? i18n.t('connect.status.connecting', { wallet: connector?.name || '' })
                      : connector?.name || ''
                  }}
                </Box>
              </Box>
              <Box v-if="connected"
                background="connectionIndicator"
                borderColor="selectedOptionBorder"
                borderRadius="full"
                borderStyle="solid"
                borderWidth="1"
                height="8"
                width="8"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </template>
  </WalletButtonRenderer>
</template> 