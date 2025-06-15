<script setup lang="ts">
import { useAvatarComponent } from './useAvatarComponent';
import SpinnerIcon from '../Icons/Spinner.vue';
import Box from "../Box/Box.vue";

interface AvatarProps {
  address: string;
  loading?: boolean;
  imageUrl?: string;
  size: number;
}

defineProps<AvatarProps>();

const AvatarRenderer = useAvatarComponent();
</script>

<template>
  <Box
    aria-hidden="true"
    border-radius="full"
    overflow="hidden"
    position="relative"
    :style="{
      height: `${size}px`,
      width: `${size}px`,
    }"
    user-select="none"
  >
    <Box
      align-items="center"
      border-radius="full"
      display="flex"
      justify-content="center"
      overflow="hidden"
      position="absolute"
      :style="{
        fontSize: `${Math.round(size * 0.55)}px`,
        height: `${size}px`,
        transform: loading ? 'scale(0.72)' : undefined,
        transition: '.25s ease',
        transitionDelay: loading ? undefined : '.1s',
        width: `${size}px`,
        willChange: 'transform',
      }"
      user-select="none"
    >
      <slot name="avatar-component" :address="address" :ensImage="imageUrl" :size="size">
        <component :is="AvatarRenderer" :address="address" :ensImage="imageUrl" :size="size" />
      </slot>
    </Box>
    <Box
      v-if="loading"
      color="accentColor"
      display="flex"
      height="full"
      position="absolute"
      width="full"
    >
      <SpinnerIcon height="100%" width="100%" />
    </Box>
  </Box>
</template>

