<template>
  <AsyncImage
    background="#d0d5de"
    border-radius="10"
    height="48"
    :src="src"
    width="48"
  />
</template>
<script setup lang="ts">
import AsyncImage from '../AsyncImage/AsyncImage.vue';
const src = async () => (await import('./assets.svg')).default;
</script> 