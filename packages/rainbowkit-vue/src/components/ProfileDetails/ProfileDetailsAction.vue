<script setup lang="ts">

const props = defineProps<{
  label: string;
  icon: any;
  url?: string;
  testId?: string;
}>();

const emit = defineEmits(['action']);

function handleClick(event: Event) {
  if (!props.url) {
    event.preventDefault();
    emit('action', event);
  }
}
</script>

<template>
  <component
    :is="url ? 'a' : 'button'"
    :href="url"
    rel="noreferrer noopener"
    target="_blank"
    type="button"
    class="profile-details-action"
    @click="handleClick"
    :data-testid="testId"
  >
    <div class="profile-details-action__inner">
      <div class="profile-details-action__icon">
        <component :is="icon" />
      </div>
      <div>
        <span class="profile-details-action__label">{{ label }}</span>
      </div>
    </div>
  </component>
</template>


<style scoped lang="scss">
.profile-details-action {
  background: var(--rk-profile-action-bg, #f5f5f5);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  display: flex;
  width: 100%;
  padding: 8px;
  transition: box-shadow 0.2s, background 0.2s;
  border: none;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background: var(--rk-profile-action-hover-bg, #ececec);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
}
.profile-details-action__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.profile-details-action__icon {
  color: var(--rk-modal-text, #222);
  margin-bottom: 2px;
}
.profile-details-action__label {
  color: var(--rk-modal-text, #222);
  font-size: 13px;
  font-weight: 600;
}
</style> 