<script setup lang="ts">
import { onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import FocusTrap from './FocusTrap.vue';

const props = defineProps({
  open: Boolean,
  titleId: String,
});
const emit = defineEmits(['close']);

function emitClose() {
  emit('close');
}

function handleEscape(event: KeyboardEvent) {
  if (props.open && event.key === 'Escape') {
    emitClose();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="dialog-overlay"
      :aria-labelledby="titleId"
      aria-modal="true"
      role="dialog"
      @click="emitClose"
    >
      <FocusTrap>
        <div class="dialog-content" @click.stop>
          <slot />
        </div>
      </FocusTrap>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
$bleed: 200px;
$z-coinbase: 2147483647;
$z-walletConnect: 99999999999999;
$z-overlay: min($z-coinbase, $z-walletConnect) - 1;

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes slideUp {
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
}

.dialog-overlay {
  /* backdropFilter: modalOverlay; background: modalBackdrop; */
  display: flex;
  justify-content: center;
  position: fixed;
  animation: fadeIn 150ms ease;
  bottom: -#{$bleed};
  left: -#{$bleed};
  padding: $bleed;
  right: -#{$bleed};
  top: -#{$bleed};
  transform: translateZ(0); // For iOS URL bar
  z-index: 2147483646; // min(coinbase, walletConnect) - 1
}

.dialog-content {
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideUp 350ms cubic-bezier(.15,1.15,0.6,1.00), fadeIn 150ms ease;
  max-width: 100vw;
  background: white;
  border-radius: 8px;
  min-width: 320px;
  min-height: 120px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.15);
}
</style> 