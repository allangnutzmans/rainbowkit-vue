<script setup lang="ts">
import { computed, useAttrs, defineEmits } from 'vue';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import Box from '../Box/Box.vue';
import * as styles from './MenuButton.css';

const props = defineProps<{
  currentlySelected?: boolean;
  testId?: string;
}>();

const emit = defineEmits(['click']);
const attrs = useAttrs();
const mobile = isMobile();

const boxClass = computed(() => [
  mobile ? styles.unsetBackgroundOnHover : undefined,
  !props.currentlySelected && touchableStyles({ active: 'shrink' }),
]);

const boxProps = computed(() =>
  props.currentlySelected
    ? {
        background: 'accentColor',
        borderColor: 'selectedOptionBorder',
        borderStyle: 'solid',
        borderWidth: '1',
        boxShadow: 'selectedOption',
        color: 'accentColorForeground',
      }
    : {
        background: { hover: 'menuItemBackground' },
        color: 'modalText',
        transition: 'default',
      }
);

function handleClick(event: Event) {
  emit('click', event);
}
</script>

<template>
  <Box
    as="button"
    borderRadius="menuButton"
    :disabled="props.currentlySelected"
    display="flex"
    @click="handleClick"
    :testId="props.testId"
    type="button"
  >
    <Box
      borderRadius="menuButton"
      :class="boxClass"
      :padding="mobile ? '8' : '6'"
      width="full"
      v-bind="{...boxProps, ...attrs}"
    >
      <slot />
    </Box>
  </Box>
</template> 