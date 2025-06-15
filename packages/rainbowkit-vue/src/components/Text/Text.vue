<script setup lang="ts">
import Box from '../Box/Box.vue';
import { computed, useAttrs } from 'vue';

const props = defineProps<{
  as?:
      | 'code'
      | 'div'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'label'
      | 'p'
      | 'span';
  color?: string;
  font?: string;
  size?: string | number;
  style?: Record<string, any>;
  weight?: string;
  class?: string;
  tabIndex?: number;
  textAlign?: string;
  display?: string;
  id?: string;
  testId?: string;
}>();

const attrs = useAttrs();
</script>

<template>
  <Box
    :as="props.as || 'div'"
    :class="props.class"
    :color="props.color"
    :display="props.display"
    :fontFamily="props.font || 'body'"
    :fontSize="props.size || '16'"
    :fontWeight="props.weight || 'regular'"
    :id="props.id"
    :style="props.style"
    :tabIndex="props.tabIndex"
    :textAlign="props.textAlign || 'inherit'"
    :testId="props.testId"
    v-bind="attrs"
  >
    <slot />
  </Box>
</template> 