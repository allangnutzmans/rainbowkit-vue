<script setup lang="ts">
const props = defineProps({
  onClose: Function,
});
</script>
<template>
  <div style="padding: 32px; border: 1px dashed #ccc;">
    <h2>MobileStatus (stub)</h2>
    <button @click="props.onClose && props.onClose()">Close</button>
  </div>
</template> 