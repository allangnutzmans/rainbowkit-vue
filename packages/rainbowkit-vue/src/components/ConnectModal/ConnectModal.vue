<template>
  <Dialog v-if="open" :open="open" :onClose="onClose" title-id="rk_connect_title">
    <DialogContent bottomSheetOnMobile padding="0" wide>
      <slot />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  open: Boolean,
  onClose: Function,
});
// TODO: Port Dialog/DialogContent to Vue and add connection status logic
</script> 