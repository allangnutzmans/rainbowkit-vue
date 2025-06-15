<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue';
import Box from '../Box/Box.vue';
import ActionButton from '../Button/ActionButton.vue';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import QRCode from '../QRCode/QRCode.vue';
import SpinnerIcon from '../Icons/Spinner.vue';
import Text from '../Text/Text.vue';
import { isSafari } from '../../utils/browsers';
import { getBrowserSrc, getPlatformSrc } from './connectDetailsUtils';

const LOGO_SIZE = '44';

const props = defineProps<{
  changeWalletStep: (newWalletStep: any) => void;
  compactModeEnabled: boolean;
  connectionError: boolean;
  onClose: () => void;
  qrCodeUri?: string;
  reconnect: (wallet: any) => void;
  wallet: any;
}>();

const i18n = inject('i18n', { t: (k: string, _v?: any) => k });

const downloadUrls = computed(() => props.wallet.downloadUrls);
const iconBackground = computed(() => props.wallet.iconBackground);
const iconUrl = computed(() => props.wallet.iconUrl);
const name = computed(() => props.wallet.name);
const qrCode = computed(() => props.wallet.qrCode);
const ready = computed(() => props.wallet.ready);
const showWalletConnectModal = computed(() => props.wallet.showWalletConnectModal);
const getDesktopUri = props.wallet.getDesktopUri;
const isDesktopDeepLinkAvailable = !!getDesktopUri;
const safari = isSafari();

const hasExtension = computed(() => !!props.wallet.extensionDownloadUrl);
const hasQrCodeAndExtension = computed(() => downloadUrls.value?.qrCode && hasExtension.value);
const hasQrCodeAndDesktop = computed(() => downloadUrls.value?.qrCode && !!props.wallet.desktopDownloadUrl);
const hasQrCode = computed(() => qrCode.value && props.qrCodeUri);

const onDesktopUri = async () => {
  const uri = await getDesktopUri?.();
  window.open(uri, safari ? '_blank' : '_self');
};

const secondaryAction = computed(() => {
  if (showWalletConnectModal.value) {
    return {
      description: !props.compactModeEnabled
        ? i18n.t('connect.walletconnect.description.full')
        : i18n.t('connect.walletconnect.description.compact'),
      label: i18n.t('connect.walletconnect.open.label'),
      onClick: () => {
        props.onClose();
        showWalletConnectModal.value();
      },
    };
  } else if (hasQrCode.value) {
    return {
      description: i18n.t('connect.secondary_action.get.description', { wallet: name.value }),
      label: i18n.t('connect.secondary_action.get.label'),
      onClick: () =>
        props.changeWalletStep(
          hasQrCodeAndExtension.value || hasQrCodeAndDesktop.value
            ? 'DownloadOptions'
            : 'Download',
        ),
    };
  }
  return null;
});

const windowWidth = ref(window.innerWidth);
const smallWindow = computed(() => windowWidth.value && windowWidth.value < 768);

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
});
</script>

<template>
  <Box display="flex" flexDirection="column" height="full" width="full">
    <template v-if="hasQrCode">
      <Box
        alignItems="center"
        display="flex"
        height="full"
        justifyContent="center"
      >
        <QRCode
          :logoBackground="iconBackground"
          :logoSize="props.compactModeEnabled ? 60 : 72"
          :logoUrl="iconUrl"
          :size="props.compactModeEnabled ? 318 : smallWindow ? Math.max(280, Math.min(windowWidth, 382)) : 382"
          :uri="props.qrCodeUri"
        />
      </Box>
    </template>
    <template v-else>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        :style="{ flexGrow: 1 }"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap="8"
        >
          <Box borderRadius="10" :height="LOGO_SIZE" overflow="hidden">
            <AsyncImage
              :useAsImage="!props.wallet.isRainbowKitConnector"
              :height="LOGO_SIZE"
              :src="iconUrl"
              :width="LOGO_SIZE"
            />
          </Box>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="4"
            paddingX="32"
            :style="{ textAlign: 'center' }"
          >
            <Text color="modalText" size="18" weight="bold">
              {{ ready
                ? i18n.t('connect.status.opening', { wallet: name })
                : hasExtension
                  ? i18n.t('connect.status.not_installed', { wallet: name })
                  : i18n.t('connect.status.not_available', { wallet: name })
              }}
            </Text>
            <Box v-if="!ready && hasExtension" paddingTop="20">
              <ActionButton
                :href="props.wallet.extensionDownloadUrl"
                :label="i18n.t('connect.secondary_action.install.label')"
                type="secondary"
              />
            </Box>
            <template v-if="ready && !hasQrCode">
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Text
                  color="modalTextSecondary"
                  size="14"
                  textAlign="center"
                  weight="medium"
                >
                  {{ i18n.t('connect.status.confirm') }}
                </Text>
              </Box>
              <Box
                alignItems="center"
                color="modalText"
                display="flex"
                flexDirection="row"
                height="32"
                marginTop="8"
              >
                <ActionButton
                  v-if="props.connectionError"
                  :label="i18n.t('connect.secondary_action.retry.label')"
                  :onClick="async () => { if (isDesktopDeepLinkAvailable) await onDesktopUri(); props.reconnect(props.wallet); }"
                />
                <Box v-else color="modalTextSecondary">
                  <SpinnerIcon />
                </Box>
              </Box>
            </template>
          </Box>
        </Box>
      </Box>
    </template>
    <Box
      alignItems="center"
      borderRadius="10"
      display="flex"
      flexDirection="row"
      gap="8"
      height="28"
      justifyContent="space-between"
      marginTop="12"
    >
      <template v-if="ready && secondaryAction">
        <Text color="modalTextSecondary" size="14" weight="medium">
          {{ secondaryAction.description }}
        </Text>
        <ActionButton
          :label="secondaryAction.label"
          :onClick="secondaryAction.onClick"
          type="secondary"
        />
      </template>
    </Box>
  </Box>
</template> 