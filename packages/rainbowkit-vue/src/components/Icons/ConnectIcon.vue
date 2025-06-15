<script setup lang="ts">
import AsyncImage from '../AsyncImage/AsyncImage.vue';
const src = async () => (await import('./connect.svg')).default;
</script>

<template>
  <AsyncImage
    background="#515a70"
    border-color="generalBorder"
    border-radius="10"
    height="48"
    :src="src"
    width="48"
  />
</template>
