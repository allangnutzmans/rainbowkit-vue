<script setup lang="ts">
import { computed } from 'vue';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import Box from '../Box/Box.vue';
import InfoIcon from '../Icons/InfoIcon.vue';

const props = defineProps<{
  ariaLabel?: string;
  onClick: () => void;
}>();

const mobile = isMobile();
</script>

<template>
  <Box
    alignItems="center"
    :aria-label="props.ariaLabel ?? 'Info'"
    as="button"
    background="closeButtonBackground"
    borderColor="actionButtonBorder"
    borderRadius="full"
    borderStyle="solid"
    :borderWidth="mobile ? '0' : '1'"
    :class="touchableStyles({ active: 'shrinkSm', hover: 'growLg' })"
    color="closeButton"
    display="flex"
    :height="mobile ? '30' : '28'"
    justifyContent="center"
    @click="props.onClick"
    :style="{ willChange: 'transform' }"
    transition="default"
    type="button"
    :width="mobile ? '30' : '28'"
  >
    <InfoIcon />
  </Box>
</template> 