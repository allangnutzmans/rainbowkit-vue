import { provide, inject } from 'vue';
import { EmojiAvatar } from '../Avatar/EmojiAvatar';

export type AvatarComponentProps = {
  address: string;
  ensImage?: string | null;
  size: number;
};
export type AvatarComponent = (props: AvatarComponentProps) => any;

export const defaultAvatar = EmojiAvatar;

const AvatarContextKey = Symbol('AvatarContext');

export function provideAvatarContext(value = defaultAvatar) {
  provide(AvatarContextKey, value);
}

export function useAvatarContext() {
  return inject(AvatarContextKey, defaultAvatar);
}
