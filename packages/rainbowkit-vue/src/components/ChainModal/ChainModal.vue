<script setup lang="ts">
import {ref, inject, computed, defineEmits} from 'vue';
import Box from '../Box/Box.vue';
import Text from '../Text/Text.vue';
import Chain from './Chain.vue';
import { DesktopScrollClassName, MobileScrollClassName } from './ChainModal.css';

const props = defineProps<{
  open: boolean,
}>();

const emit = defineEmits(['close']);

const pendingChainId = ref<number|null>(null);

const chainId = inject('chainId', 1);
const chains = inject('chains', []);
const switchChain = inject('switchChain', ({}: any) => {});
const disconnect = inject('disconnect', () => {});
const i18n = inject('i18n', { t: (k: string) => k });
const rainbowkitChains = inject('rainbowkitChains', []);
const isMobile = inject('isMobile', false);

const isCurrentChainSupported = computed(() => chains.some((chain: any) => chain.id === chainId));
const chainIconSize = computed(() => isMobile ? 36 : 28);
const titleId = 'rk_chain_modal_title';

function handleSwitchChain({ chainId: _chainId }: { chainId: number }) {
  pendingChainId.value = _chainId;
  switchChain({ chainId: _chainId });
  setTimeout(() => {
    pendingChainId.value = null;
    emit('close');
  }, 500);
}

function handleDisconnect() {
  disconnect();
}

const scrollClass = computed(() => isMobile ? MobileScrollClassName : DesktopScrollClassName);
</script>

<template>
  <div v-if="props.open" role="dialog" :aria-labelledby="titleId" style="background: rgba(0,0,0,0.5); position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center;">
    <div style="background: white; border-radius: 16px; min-width: 320px; max-width: 95vw; min-height: 200px; padding: 24px; position: relative;">
      <Box display="flex" flexDirection="column" gap="14">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box v-if="isMobile" width="30" />
          <Box paddingBottom="0" paddingLeft="8" paddingTop="4">
            <Text as="h1" color="modalText" :id="titleId" :size="isMobile ? '20' : '18'" weight="heavy">
              {{ i18n.t('chains.title') }}
            </Text>
          </Box>
          <button aria-label="Close" @click="emit('close')" style="all: unset; cursor: pointer; font-size: 24px;">×</button>
        </Box>
        <Box v-if="!isCurrentChainSupported" marginX="8" :textAlign="isMobile ? 'center' : 'left'">
          <Text color="modalTextSecondary" size="14" weight="medium">
            {{ i18n.t('chains.wrong_network') }}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="4" padding="2" paddingBottom="16" :class="scrollClass">
          <Chain
            v-for="({ iconBackground, iconUrl, id, name }, idx) in rainbowkitChains"
            :key="id"
            :chainId="id"
            :currentChainId="chainId"
            :switchChain="handleSwitchChain"
            :chainIconSize="chainIconSize"
            :isLoading="pendingChainId === id"
            :src="iconUrl"
            :name="name"
            :iconBackground="iconBackground"
            :idx="idx"
          />
          <template v-if="!isCurrentChainSupported">
            <Box background="generalBorderDim" height="1" marginX="8" />
            <button @click="handleDisconnect" data-testid="chain-option-disconnect" style="all: unset; cursor: pointer; color: red; font-weight: bold; width: 100%; padding: 12px 0;">
              <Box color="error" fontFamily="body" fontSize="16" fontWeight="bold">
                <Box alignItems="center" display="flex" flexDirection="row" justifyContent="space-between">
                  <Box alignItems="center" display="flex" flexDirection="row" gap="4" :height="chainIconSize">
                    <Box alignItems="center" color="error" :height="chainIconSize" justifyContent="center" marginRight="8">
                      <span style="font-size: 20px;">⧉</span>
                    </Box>
                    <div>{{ i18n.t('chains.disconnect') }}</div>
                  </Box>
                </Box>
              </Box>
            </button>
          </template>
        </Box>
      </Box>
    </div>
  </div>
</template>