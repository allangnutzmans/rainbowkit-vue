<script setup lang="ts">
import { ref, computed, inject, useAttrs, defineEmits } from 'vue';
import { touchableStyles } from '../../css/touchableStyles';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import Box from '../Box/Box.vue';
import Text from '../Text/Text.vue';
import * as styles from './ModalSelection.css';

const props = defineProps<{
  as?: string;
  currentlySelected?: boolean;
  ready?: boolean;
  recent?: boolean;
  name: string;
  iconUrl: string | (() => Promise<string>);
  iconBackground?: string;
  testId?: string;
  isRainbowKitConnector?: boolean;
}>();

const emit = defineEmits(['click']);
const attrs = useAttrs();
const isMouseOver = ref(false);
const i18n = inject('i18n', { t: (k: string) => k });

const tag = computed(() => props.as || 'button');

const buttonClass = computed(() =>
  !props.currentlySelected
    ? [styles.transparentBorder, touchableStyles({ active: 'shrink' })]
    : undefined
);

const buttonProps = computed(() =>
  props.currentlySelected
    ? {
        background: 'accentColor',
        borderColor: 'selectedOptionBorder',
        boxShadow: 'selectedWallet',
      }
    : {
        background: { hover: 'menuItemBackground' },
      }
);

function handleClick(event: Event) {
  emit('click', event);
}
</script>

<template>
  <Box
    display="flex"
    flexDirection="column"
    @mouseenter="isMouseOver = true"
    @mouseleave="isMouseOver = false"
  >
    <Box
      :as="tag"
      borderRadius="menuButton"
      borderStyle="solid"
      borderWidth="1"
      :class="buttonClass"
      :disabled="props.currentlySelected"
      @click="handleClick"
      padding="5"
      :style="{ willChange: 'transform' }"
      :testId="props.testId"
      transition="default"
      width="full"
      v-bind="{...buttonProps, ...attrs}"
    >
      <Box
        :color="props.currentlySelected ? 'accentColorForeground' : 'modalText'"
        :disabled="!props.ready"
        fontFamily="body"
        fontSize="16"
        fontWeight="bold"
        transition="default"
      >
        <Box alignItems="center" display="flex" flexDirection="row" gap="12">
          <AsyncImage
            :background="props.iconBackground"
            v-bind="!isMouseOver && props.isRainbowKitConnector ? { borderColor: 'actionButtonBorder' } : {}"
            :useAsImage="!props.isRainbowKitConnector"
            borderRadius="6"
            height="28"
            :src="props.iconUrl"
            width="28"
          />
          <Box>
            <Box
              :style="{ marginTop: props.recent ? -2 : undefined }"
              maxWidth="200"
            >
              {{ props.name }}
            </Box>
            <template v-if="props.recent">
              <Text
                :color="props.currentlySelected ? 'accentColorForeground' : 'accentColor'"
                size="12"
                :style="{ lineHeight: 1, marginTop: -1 }"
                weight="medium"
              >
                {{ i18n.t('connect.recent') }}
              </Text>
            </template>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
</template> 