<script setup lang="ts">
import Box from "../Box/Box.vue";

defineProps<{
  href: string,
}>();
</script>

<template>
  <Box as="a" color="accentColor" :href="href" rel="noreferrer" target="_blank">
    <slot />
  </Box>
</template>
