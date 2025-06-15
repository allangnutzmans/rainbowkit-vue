<template>
  <div :class="contentClass" :style="contentStyle">
    <div :style="{ padding: paddingValue }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps({
  wide: Boolean,
  padding: { type: String, default: '16px' },
});

const contentClass = computed(() => [
  'dialog-content',
  { 'dialog-content-wide': props.wide },
]);
const contentStyle = computed(() => ({
  maxWidth: props.wide ? '480px' : '360px',
  width: '100%',
}));
const paddingValue = computed(() => props.padding);
</script>

<style scoped lang="scss">
$largeScreenMinWidth: 768px;
$bleed: 200px;

.dialog-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
  overflow: hidden;
  position: relative;
  width: 360px;
  max-width: 100vw;
  box-sizing: content-box;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: #{$largeScreenMinWidth}) {
    width: 360px;
  }
}
.dialog-content-wide {
  width: 100vw;
  @media screen and (min-width: #{$largeScreenMinWidth}) {
    width: 480px;
  }
}
.dialog-content-compact {
  min-width: 368px;
  width: 368px;
  @media screen and (min-width: #{$largeScreenMinWidth}) {
    min-width: 368px;
    width: 368px;
  }
}
.dialog-content-mobile {
  border-radius: 16px;
  border-width: 0px;
  box-sizing: border-box;
  width: 100vw;
}
.bottom-sheet-overrides {
  @media screen and (max-width: #{$largeScreenMinWidth - 1}) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: -#{$bleed};
    padding-bottom: $bleed;
    top: $bleed;
  }
}
</style> 