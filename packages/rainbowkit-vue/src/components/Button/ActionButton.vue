<script setup lang="ts">
import { computed } from 'vue';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import Box from '../Box/Box.vue';
import Text from '../Text/Text.vue';

type Size = 'small' | 'medium' | 'large';

const sizeVariants: Record<
  Size,
  {
    paddingX: string;
    paddingY: string;
    fontSize: string;
    height?: string;
  }
> = {
  large: {
    fontSize: '16',
    paddingX: '24',
    paddingY: '10',
  },
  medium: {
    fontSize: '14',
    height: '28',
    paddingX: '12',
    paddingY: '4',
  },
  small: {
    fontSize: '14',
    paddingX: '10',
    paddingY: '5',
  },
};

const props = defineProps<{
  href?: string;
  label: string;
  onClick?: () => void;
  rel?: string;
  size?: Size;
  target?: string;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  testId?: string;
}>();

const isPrimary = computed(() => props.type === 'primary');
const isNotLarge = computed(() => props.size !== 'large');
const mobile = isMobile();
const background = computed(() => {
  if (!props.disabled) {
    if (isPrimary.value) {
      return 'accentColor';
    } else if (isNotLarge.value) {
      return 'actionButtonSecondaryBackground';
    }
    return null;
  }
  return 'actionButtonSecondaryBackground';
});
const { fontSize, height, paddingX, paddingY } = sizeVariants[props.size ?? 'medium'];
const hasBorder = !mobile || !isNotLarge.value;

const borderProps = computed(() => {
  if (hasBorder) {
    return {
      borderColor:
        mobile && !isNotLarge.value && !isPrimary.value
          ? 'actionButtonBorderMobile'
          : 'actionButtonBorder',
      borderStyle: 'solid',
      borderWidth: '1',
    };
  }
  return {};
});

const asTag = computed(() => (props.href && !props.disabled ? 'a' : 'button'));
const tagProps = computed(() =>
  asTag.value === 'a'
    ? { href: props.href, rel: props.rel ?? 'noreferrer noopener', target: props.target ?? '_blank' }
    : { type: 'button' }
);

const handleClick = (e: Event) => {
  if (!props.disabled && props.onClick) {
    props.onClick();
  }
};

const boxProps = computed(() => ({
  ...tagProps.value,
  ...borderProps.value,
}));
</script>

<template>
  <Box
    :as="asTag"
    v-bind="boxProps"
    :onClick="!props.disabled ? handleClick : undefined"
    borderRadius="actionButton"
    :class="!props.disabled && touchableStyles({ active: 'shrinkSm', hover: 'grow' })"
    display="block"
    :paddingX="paddingX"
    :paddingY="paddingY"
    :style="{ willChange: 'transform' }"
    :testId="props.testId"
    textAlign="center"
    transition="transform"
    :background="background || undefined"
    :height="height"
  >
    <Text
      :color="
        !props.disabled
          ? isPrimary
            ? 'accentColorForeground'
            : 'accentColor'
          : 'modalTextSecondary'
      "
      :size="fontSize"
      weight="bold"
    >
      {{ props.label }}
    </Text>
  </Box>
</template> 