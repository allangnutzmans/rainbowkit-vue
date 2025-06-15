<script setup lang="ts">
import {ref, computed, defineProps, useAttrs} from 'vue';
import clsx, { type ClassValue } from 'clsx';
import { type Atoms, atoms } from '../../css/atoms';
import { sprinkles } from '../../css/sprinkles.css';


const props = defineProps<Partial<Atoms> & {
  as?: string | object;
  className?: ClassValue;
  testId?: string;
  [key: string]: unknown;
}>();

const attrs = useAttrs();

const elementRef = ref<HTMLElement | null>(null);

const atomProps: Record<string, unknown> = {};
const nativeProps: Record<string, unknown> = {};

for (const key in props) {
  if (
      key !== 'as' &&
      key !== 'className' &&
      key !== 'testId' &&
      sprinkles.properties.has(key as keyof Omit<Atoms, 'reset'>)
  ) {
    atomProps[key] = props[key];
  } else if (key !== 'as' && key !== 'className' && key !== 'testId') {
    nativeProps[key] = props[key];
  }
}

const atomicClasses = atoms({
  // TODO FIX THIS TYPE ASSERTION
  // @ts-ignore
  reset: typeof props.as === 'string' ? (props.as as Atoms['reset']) : 'div',
  ...atomProps,
});

const computedClass = computed(() => clsx(atomicClasses, props.className));

const dataTestId = computed(() =>
    props.testId ? `rk-${props.testId.replace(/^rk-/, '')}` : undefined
);
</script>

<template>
  <component
      :is="props.as"
      v-bind="attrs"
      :class="computedClass"
      :data-testid="dataTestId"
      ref="elementRef"
  />
</template>

