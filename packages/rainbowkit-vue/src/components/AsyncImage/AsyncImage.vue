<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAsyncImage, type AsyncImageSrc } from './useAsyncImage';
import { isIOS } from '../../utils/isMobile';
import Box from '../Box/Box.vue';

interface CustomBorderColor {
  custom: string;
}

interface AsyncImageProps {
  alt?: string;
  src?: string | AsyncImageSrc;
  width: string | number;
  height: string | number;
  background?: string;
  borderRadius?: string;
  useAsImage?: boolean;
  borderColor?: string | CustomBorderColor;
  boxShadow?: string;
  testId?: string;
}

const props = defineProps<AsyncImageProps>();

const isRemoteImageLoaded = ref(false);
const ios = isIOS();

const src = useAsyncImage(props.src);

const isRemoteImage = computed(() => !!src.value && /^http/.test(src.value));

function onImageLoad() {
  isRemoteImageLoaded.value = true;
}

const imgAttrs = computed(() => {
  const baseAttrs = {
    'aria-hidden': 'true',
    as: 'img',
    src: src.value,
  };

  if (isRemoteImage.value) {
    return {
      ...baseAttrs,
      onLoad: onImageLoad,
    };
  }

  return baseAttrs;
});

const imgStyle = computed(() => ({
  WebkitUserSelect: ios ? 'none' : undefined,
}));
</script>

<template>
  <Box
      :aria-label="props.alt"
      :border-radius="props.borderRadius"
      :box-shadow="props.boxShadow"
      :height="typeof props.height === 'string' ? props.height : undefined"
      overflow="hidden"
      position="relative"
      role="img"
      :style="{
      background: props.background,
      height: typeof props.height === 'number' ? props.height + 'px' : undefined,
      width: typeof props.width === 'number' ? props.width + 'px' : undefined,
    }"
      :width="typeof props.width === 'string' ? props.width : undefined"
      :data-test-id="props.testId"
  >
    <Box
        v-bind="imgAttrs"
        height="full"
        position="absolute"
        :style="[imgStyle, {
        WebkitTouchCallout: 'none',
        transition: 'opacity .15s linear',
        userSelect: 'none',
        ...(!props.useAsImage && isRemoteImage
          ? { opacity: isRemoteImageLoaded ? 1 : 0 }
          : {}),
      }]"
        width="full"
    />
    <Box
        v-if="props.borderColor"
        :style="typeof props.borderColor === 'object' && 'custom' in props.borderColor
        ? { borderColor: props.borderColor.custom }
        : {}"
        :border-radius="props.borderRadius"
        border-style="solid"
        border-width="1"
        height="full"
        position="relative"
        width="full"
        :border-color="typeof props.borderColor === 'string' ? props.borderColor : undefined"
    />
  </Box>
</template>
