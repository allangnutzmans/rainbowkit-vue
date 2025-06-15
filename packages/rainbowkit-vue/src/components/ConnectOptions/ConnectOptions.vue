<script setup lang="ts">
import { inject, computed } from 'vue';
import { isMobile } from '../../utils/isMobile';
import DesktopOptions from './DesktopOptions.vue';
import MobileOptions from './MobileOptions.vue';
import MobileStatus from './MobileStatus.vue';

const props = defineProps<{
  onClose: () => void;
}>();

const walletButtonContext = inject('walletButtonContext', { connector: null });
const connector = computed(() => walletButtonContext.connector);

const mobile = isMobile();
</script>

<template>
  <div>
    <template v-if="mobile">
      <MobileStatus v-if="connector" :onClose="props.onClose" />
      <MobileOptions v-else :onClose="props.onClose" />
    </template>
    <DesktopOptions v-else :onClose="props.onClose" />
  </div>
</template>