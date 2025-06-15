<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { UserRejectedRequestError } from 'viem';
import { useAccount, useSignMessage } from '@wagmi/vue';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import AsyncImage from '../AsyncImage/AsyncImage.vue';
import Box from '../Box/Box.vue';
import ActionButton from '../Button/ActionButton.vue';
import CloseButton from '../CloseButton/CloseButton.vue';
import { useAuthenticationAdapter } from '../RainbowKitProvider/AuthenticationContext';
import { useI18nContext } from '../RainbowKitProvider/useI18nContext';
import Text from '../Text/Text.vue';

const props = defineProps<{
  onClose: () => void;
  onCloseModal: () => void;
}>();

const i18n = useI18nContext();
const authAdapter = useAuthenticationAdapter();

const status = ref<'idle' | 'signing' | 'verifying'>('idle');
const errorMessage = ref<string | undefined>(undefined);
const nonce = ref<string | undefined>(undefined);

const mobile = isMobile();
const { address, chain } = useAccount();
const { signMessageAsync } = useSignMessage();

const signInIcon = async () => (await import('./sign.png')).default;

const getNonce = async () => {
  try {
    nonce.value = await authAdapter.getNonce();
  } catch {
    errorMessage.value = i18n.t('sign_in.message.preparing_error');
    status.value = 'idle';
  }
};

let once = false;
onMounted(() => {
  if (!once) {
    once = true;
    getNonce();
  }
});

const signIn = async () => {
  try {
    if (!address.value || !chain.value?.id || !nonce.value) return;

    errorMessage.value = undefined;
    status.value = 'signing';

    const message = authAdapter.createMessage({
      address: address.value,
      chainId: chain.value.id,
      nonce: nonce.value,
    });

    let signature: string;
    try {
      signature = await signMessageAsync({ message });
    } catch (error) {
      if (error instanceof UserRejectedRequestError) {
        status.value = 'idle';
        return;
      }
      errorMessage.value = i18n.t('sign_in.signature.signing_error');
      status.value = 'idle';
      return;
    }

    status.value = 'verifying';

    try {
      const verified = await authAdapter.verify({ message, signature });
      if (verified) {
        props.onCloseModal();
        return;
      }
      throw new Error();
    } catch {
      errorMessage.value = i18n.t('sign_in.signature.verifying_error');
      status.value = 'idle';
      return;
    }
  } catch {
    errorMessage.value = i18n.t('sign_in.signature.oops_error');
    status.value = 'idle';
  }
};
</script>

<template>
  <Box position="relative">
    <Box
      display="flex"
      paddingRight="16"
      paddingTop="16"
      position="absolute"
      right="0"
    >
      <CloseButton @close="props.onClose" />
    </Box>
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      :gap="mobile ? '32' : '24'"
      padding="24"
      paddingX="18"
      :style="{ paddingTop: mobile ? '60px' : '36px' }"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        :gap="mobile ? '6' : '4'"
        :style="{ maxWidth: mobile ? '320px' : '280px' }"
      >
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          :gap="mobile ? '32' : '16'"
        >
          <AsyncImage :height="40" :src="signInIcon" :width="40" />
          <Text
            color="modalText"
            :size="mobile ? '20' : '18'"
            textAlign="center"
            weight="heavy"
          >
            {{ i18n.t('sign_in.label') }}
          </Text>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          :gap="mobile ? '16' : '12'"
        >
          <Text
            color="modalTextSecondary"
            :size="mobile ? '16' : '14'"
            textAlign="center"
          >
            {{ i18n.t('sign_in.description') }}
          </Text>
          <Text
            v-if="status === 'idle' && errorMessage"
            color="error"
            :size="mobile ? '16' : '14'"
            textAlign="center"
            weight="bold"
          >
            {{ errorMessage }}
          </Text>
        </Box>
      </Box>

      <Box
        :alignItems="!mobile ? 'center' : undefined"
        display="flex"
        flexDirection="column"
        gap="8"
        width="full"
      >
        <ActionButton
          :disabled="!nonce || status === 'signing' || status === 'verifying'"
          :label="
            !nonce
              ? i18n.t('sign_in.message.preparing')
              : status === 'signing'
                ? i18n.t('sign_in.signature.waiting')
                : status === 'verifying'
                  ? i18n.t('sign_in.signature.verifying')
                  : i18n.t('sign_in.message.send')
          "
          :onClick="signIn"
          :size="mobile ? 'large' : 'medium'"
          testId="auth-message-button"
        />
        <ActionButton
          v-if="mobile"
          label="Cancel"
          :onClick="props.onClose"
          size="large"
          type="secondary"
        />
        <Box
          v-else
          as="button"
          borderRadius="full"
          :class="touchableStyles({ active: 'shrink', hover: 'grow' })"
          display="block"
          @click="props.onClose"
          paddingX="10"
          paddingY="5"
          rel="noreferrer"
          :style="{ willChange: 'transform' }"
          target="_blank"
          transition="default"
        >
          <Text
            color="closeButton"
            :size="mobile ? '16' : '14'"
            weight="bold"
          >
            {{ i18n.t('sign_in.message.cancel') }}
          </Text>
        </Box>
      </Box>
    </Box>
  </Box>
</template> 