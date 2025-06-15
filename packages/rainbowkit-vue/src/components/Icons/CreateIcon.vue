<template>
  <AsyncImage
    background="#e3a5e8"
    border-color="generalBorder"
    border-radius="10"
    height="48"
    :src="src"
    width="48"
  />
</template>
<script setup lang="ts">
import AsyncImage from '../AsyncImage/AsyncImage.vue';
const src = async () => (await import('./create.svg')).default;
</script> 