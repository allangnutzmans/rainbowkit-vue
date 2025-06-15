import { shallowRef, type Component } from 'vue';
import EmojiAvatar from './EmojiAvatar.vue';

const avatarComponent = shallowRef<Component>(EmojiAvatar);

export function setAvatarComponent(component: Component) {
  avatarComponent.value = component;
}

export function useAvatarComponent() {
  return avatarComponent;
} 