<script setup lang="ts">
import { inject, computed } from 'vue';
import { touchableStyles } from '../../css/touchableStyles';
import Box from '../Box/Box.vue';
import ActionButton from '../Button/ActionButton.vue';
import DisclaimerLink from '../Disclaimer/DisclaimerLink.vue';
import DisclaimerText from '../Disclaimer/DisclaimerText.vue';
import AssetsIcon from '../Icons/Assets.vue';
import LoginIcon from '../Icons/Login.vue';
import Text from '../Text/Text.vue';

const props = defineProps<{
  compactModeEnabled?: boolean;
  getWallet: () => void;
}>();

const compactModeEnabled = computed(() => props.compactModeEnabled ?? false);

const appContext = inject('appContext', { disclaimer: null, learnMoreUrl: '#' });
const i18n = inject('i18n', { t: (k: string) => k });

const Disclaimer = appContext.disclaimer;
const learnMoreUrl = appContext.learnMoreUrl;
</script>

<template>
  <Box
    alignItems="center"
    color="accentColor"
    display="flex"
    flexDirection="column"
    height="full"
    justifyContent="space-around"
  >
    <Box marginBottom="10">
      <template v-if="!compactModeEnabled">
        <Text color="modalText" size="18" weight="heavy">
          {{ i18n.t('intro.title') }}
        </Text>
      </template>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      gap="32"
      justifyContent="center"
      marginY="20"
      :style="{ maxWidth: '312px' }"
    >
      <Box alignItems="center" display="flex" flexDirection="row" gap="16">
        <Box borderRadius="6" height="48" minWidth="48" width="48">
          <AssetsIcon />
        </Box>
        <Box display="flex" flexDirection="column" gap="4">
          <Text color="modalText" size="14" weight="bold">
            {{ i18n.t('intro.digital_asset.title') }}
          </Text>
          <Text color="modalTextSecondary" size="14" weight="medium">
            {{ i18n.t('intro.digital_asset.description') }}
          </Text>
        </Box>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="row" gap="16">
        <Box borderRadius="6" height="48" minWidth="48" width="48">
          <LoginIcon />
        </Box>
        <Box display="flex" flexDirection="column" gap="4">
          <Text color="modalText" size="14" weight="bold">
            {{ i18n.t('intro.login.title') }}
          </Text>
          <Text color="modalTextSecondary" size="14" weight="medium">
            {{ i18n.t('intro.login.description') }}
          </Text>
        </Box>
      </Box>
    </Box>
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="12"
      justifyContent="center"
      margin="10"
    >
      <ActionButton :label="i18n.t('intro.get.label')" :onClick="props.getWallet" />
      <Box
        as="a"
        :class="touchableStyles({ active: 'shrink', hover: 'grow' })"
        display="block"
        :href="learnMoreUrl"
        paddingX="12"
        paddingY="4"
        rel="noreferrer"
        :style="{ willChange: 'transform' }"
        target="_blank"
        transition="default"
      >
        <Text color="accentColor" size="14" weight="bold">
          {{ i18n.t('intro.learn_more.label') }}
        </Text>
      </Box>
    </Box>
    <template v-if="Disclaimer && !compactModeEnabled">
      <Box marginBottom="8" marginTop="12" textAlign="center">
        <component :is="Disclaimer" :Link="DisclaimerLink" :Text="DisclaimerText" />
      </Box>
    </template>
  </Box>
</template> 