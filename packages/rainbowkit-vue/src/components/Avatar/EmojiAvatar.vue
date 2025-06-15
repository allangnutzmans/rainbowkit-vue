<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Box from '../Box/Box.vue';
import SpinnerIcon from '../Icons/Spinner.vue';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';

const props = defineProps({
  address: { type: String, required: true },
  ensImage: String,
  size: { type: Number, required: true },
});

const loaded = ref(false);

watch(
  () => props.ensImage,
  (newImage) => {
    loaded.value = false;
    if (newImage) {
      const img = new window.Image();
      img.src = newImage;
      img.onload = () => {
        loaded.value = true;
      };
    }
  },
  { immediate: true }
);

const avatarData = computed(() => emojiAvatarForAddress(props.address));
</script>

<template>
  <Box
    v-if="props.ensImage && loaded"
    background-size="cover"
    border-radius="full"
    position="absolute"
    :style="{
      backgroundImage: `url(${props.ensImage})`,
      backgroundPosition: 'center',
      height: props.size + 'px',
      width: props.size + 'px',
    }"
  />
  <Box
    v-else-if="props.ensImage && !loaded"
    align-items="center"
    background-size="cover"
    border-radius="full"
    color="modalText"
    display="flex"
    justify-content="center"
    position="absolute"
    :style="{
      height: props.size + 'px',
      width: props.size + 'px',
    }"
  >
    <SpinnerIcon />
  </Box>
  <Box
    v-else
    align-items="center"
    display="flex"
    justify-content="center"
    overflow="hidden"
    :style="{
      backgroundColor: avatarData.color,
      height: props.size + 'px',
      width: props.size + 'px',
    }"
  >
    {{ avatarData.emoji }}
  </Box>
</template> 