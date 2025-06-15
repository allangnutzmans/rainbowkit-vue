<script setup lang="ts">
import { computed } from 'vue';
import { isMobile } from '../../utils/isMobile';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import type { AsyncImageSrc } from '../AsyncImage/useAsyncImage';
import Box from '../Box/Box.vue';
import MenuButton from '../MenuButton/MenuButton.vue';
import { useI18nContext } from '../RainbowKitProvider/useI18nContext';
import { useRainbowKitChains } from '../RainbowKitProvider/useRainbowKitChains';
import Text from '../Text/Text.vue';

interface ChainProps {
  chainId: number;
  currentChainId: number;
  switchChain: (params: { chainId: number }) => void;
  chainIconSize: string | number;
  name?: string;
  isLoading: boolean;
  iconBackground?: string;
  src?: string | AsyncImageSrc | null;
  idx: number;
}

const props = defineProps<ChainProps>();

const mobile = isMobile();
const { i18n } = useI18nContext();
const rainbowkitChains = useRainbowKitChains();

const isCurrentChain = computed(() => props.currentChainId === props.chainId);

const handleSwitch = () => {
  if (!isCurrentChain.value) {
    props.switchChain({ chainId: props.chainId });
  }
};
</script>

<template>
  <MenuButton
    :currentlySelected="isCurrentChain"
    :onClick="isCurrentChain ? undefined : handleSwitch"
    :testId="`chain-option-${props.chainId}`"
  >
    <Box fontFamily="body" fontSize="16" fontWeight="bold">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          gap="4"
          :height="props.chainIconSize"
        >
          <template v-if="props.src">
            <Box height="full" marginRight="8">
              <AsyncImage
                :alt="props.name"
                :background="props.iconBackground"
                borderRadius="full"
                :height="props.chainIconSize"
                :src="props.src"
                :width="props.chainIconSize"
                :testId="`chain-option-${props.chainId}-icon`"
              />
            </Box>
          </template>
          <div>{{ props.name ?? props.name }}</div>
        </Box>
        <template v-if="isCurrentChain">
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            marginRight="6"
          >
            <Text color="accentColorForeground" size="14" weight="medium">
              {{ i18n.t('chains.connected') }}
            </Text>
            <Box
              background="connectionIndicator"
              borderColor="selectedOptionBorder"
              borderRadius="full"
              borderStyle="solid"
              borderWidth="1"
              height="8"
              marginLeft="8"
              width="8"
            />
          </Box>
        </template>
        <template v-else-if="props.isLoading">
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            marginRight="6"
          >
            <Text color="modalText" size="14" weight="medium">
              {{ i18n.t('chains.confirm') }}
            </Text>
            <Box
              background="standby"
              borderRadius="full"
              height="8"
              marginLeft="8"
              width="8"
            />
          </Box>
        </template>
      </Box>
    </Box>
  </MenuButton>
  <template v-if="mobile && props.idx < rainbowkitChains.length - 1">
    <Box background="generalBorderDim" height="1" marginX="8" />
  </template>
</template> 