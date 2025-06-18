import EmojiAvatar from '../Avatar/EmojiAvatar.vue';
import { ref } from 'vue';

export interface AvatarProps {
  address: string;
  loading?: boolean;
  imageUrl?: string;
  size: number;
}

export type AvatarComponent = typeof EmojiAvatar;

export const defaultAvatar = EmojiAvatar;
const avatar = ref<AvatarComponent>(defaultAvatar);

export function useAvatar() {
  return {
    avatar,
    setAvatar: (comp: AvatarComponent) => (avatar.value = comp),
    reset: () => (avatar.value = defaultAvatar),
  };
} 