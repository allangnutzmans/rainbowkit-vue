<script setup lang="ts">
import { computed } from 'vue';
import { Cuer } from 'cuer';
import Box from '../Box/Box.vue';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import { QRCodeBackgroundClassName } from '../ConnectOptions/DesktopOptions.css';

export type ErrorCorrectionLevel = 'low' | 'medium' | 'quartile' | 'high';

const props = defineProps<{
  ecc?: ErrorCorrectionLevel;
  logoBackground?: string;
  logoUrl?: string | (() => Promise<string>);
  logoSize?: number;
  size?: number;
  uri: string;
}>();

const padding = 20;
const size = computed(() => (props.size ?? 200) - padding * 2);
const resolvedLogoUrl = useAsyncImage(props.logoUrl);
</script>

<template>
  <Box
    borderColor="generalBorder"
    borderRadius="menuButton"
    borderStyle="solid"
    borderWidth="1"
    :class="QRCodeBackgroundClassName"
    :padding="padding"
    width="max"
  >
    <Box
      :style="{
        height: size,
        userSelect: 'none',
        width: size,
      }"
      userSelect="none"
    >
      <Cuer.Root :errorCorrection="props.ecc ?? 'medium'" :size="size" :value="props.uri">
        <Cuer.Cells :radius="1" />
        <Cuer.Finder :radius="0.25" />
        <template v-if="resolvedLogoUrl">
          <Cuer.Arena>
            <img
              alt="Wallet Logo"
              :src="resolvedLogoUrl"
              style="object-fit: cover; height: 88%; width: 88%; border-radius: 22.5%;"
              :style="{ backgroundColor: props.logoBackground }"
            />
          </Cuer.Arena>
        </template>
      </Cuer.Root>
    </Box>
  </Box>
</template> 