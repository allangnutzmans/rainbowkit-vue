<script setup lang="ts">
import Box from "../Box/Box.vue";
import CloseIcon from "../Icons/CloseIcon.vue";
import {inject} from "vue";
withDefaults(defineProps<{
  ariaLabel?: string
}>(),{
  ariaLabel: 'close'
});

const emit = defineEmits(['close']);

const mobile = inject('isMobile', false);

function emitClose() {
  emit('close');
}
</script>

<template>
  <Box
    align-items="center"
    :aria-label="ariaLabel"
    as="button"
    background="closeButtonBackground"
    border-color="actionButtonBorder"
    border-radius="full"
    border-style="solid"
    :border-width="mobile ? '0' : '1'"
    color="closeButton"
    display="flex"
    :height="mobile ? '30' : '28'"
    justify-content="center"
    @click="emitClose"
    style="will-change: transform"
    transition="default"
    type="button"
    :width="mobile ? '30' : '28'"
  >
    <CloseIcon  mobile/>
  </Box>
</template>