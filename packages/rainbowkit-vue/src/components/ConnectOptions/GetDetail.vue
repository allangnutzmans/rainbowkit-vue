<script setup lang="ts">
import { inject, computed } from 'vue';
import Box from '../Box/Box.vue';
import ActionButton from '../Button/ActionButton.vue';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import Text from '../Text/Text.vue';
import { useWalletConnectors } from '../../wallets/useWalletConnectors';

const props = defineProps<{
  getWalletDownload: (walletId: string) => void;
  compactModeEnabled: boolean;
}>();

const i18n = inject('i18n', { t: (k: string) => k });

const wallets = computed(() =>
  useWalletConnectors().filter(wallet => wallet.isRainbowKitConnector)
);
const shownWallets = computed(() => wallets.value.slice(0, 5));
</script>

<template>
  <Box
    alignItems="center"
    display="flex"
    flexDirection="column"
    height="full"
    marginTop="18"
    width="full"
  >
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="28"
      height="full"
      width="full"
    >
      <template v-for="wallet in shownWallets" :key="wallet.id">
        <template v-if="wallet.extensionDownloadUrl || wallet.desktopDownloadUrl || (wallet.qrCode && wallet.downloadUrls?.qrCode)">
          <Box
            alignItems="center"
            display="flex"
            gap="16"
            justifyContent="space-between"
            width="full"
          >
            <Box
              alignItems="center"
              display="flex"
              flexDirection="row"
              gap="16"
            >
              <AsyncImage
                :background="wallet.iconBackground"
                borderColor="actionButtonBorder"
                borderRadius="10"
                height="48"
                :src="wallet.iconUrl"
                width="48"
              />
              <Box display="flex" flexDirection="column" gap="2">
                <Text color="modalText" size="14" weight="bold">
                  {{ wallet.name }}
                </Text>
                <Text color="modalTextSecondary" size="14" weight="medium">
                  {{
                    wallet.downloadUrls?.qrCode && wallet.extensionDownloadUrl
                      ? i18n.t('get.mobile_and_extension.description')
                      : wallet.downloadUrls?.qrCode && wallet.desktopDownloadUrl
                        ? i18n.t('get.mobile_and_desktop.description')
                        : wallet.downloadUrls?.qrCode && wallet.qrCode
                          ? i18n.t('get.mobile.description')
                          : wallet.extensionDownloadUrl
                            ? i18n.t('get.extension.description')
                            : null
                  }}
                </Text>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <ActionButton
                :label="i18n.t('get.action.label')"
                :onClick="() => props.getWalletDownload(wallet.id)"
                type="secondary"
              />
            </Box>
          </Box>
        </template>
      </template>
    </Box>
    <Box
      alignItems="center"
      borderRadius="10"
      display="flex"
      flexDirection="column"
      gap="8"
      justifyContent="space-between"
      marginBottom="4"
      paddingY="8"
      :style="{ maxWidth: '275px', textAlign: 'center' }"
    >
      <Text color="modalText" size="14" weight="bold">
        {{ i18n.t('get.looking_for.title') }}
      </Text>
      <Text color="modalTextSecondary" size="14" weight="medium">
        {{ props.compactModeEnabled
          ? i18n.t('get.looking_for.desktop.compact_description')
          : i18n.t('get.looking_for.desktop.wide_description')
        }}
      </Text>
    </Box>
  </Box>
</template> 