<template>
  <div tabindex="0" @focus="() => moveFocus('end')" />
  <div ref="contentRef" tabindex="-1" style="outline: none;">
    <slot />
  </div>
  <div tabindex="0" @focus="() => moveFocus('start')" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const contentRef = ref<HTMLElement | null>(null);

function moveFocus(position: 'start' | 'end') {
  const el = contentRef.value;
  if (!el) return;
  const focusable = el.querySelectorAll('button:not(:disabled), a[href]');
  if (!focusable.length) return;
  if (position === 'end') {
    (focusable[focusable.length - 1] as HTMLElement).focus();
  } else {
    (focusable[0] as HTMLElement).focus();
  }
}

let previouslyActive: Element | null = null;
onMounted(() => {
  previouslyActive = document.activeElement;
});
onBeforeUnmount(() => {
  if (previouslyActive instanceof HTMLElement) {
    previouslyActive.focus();
  }
});
</script> 