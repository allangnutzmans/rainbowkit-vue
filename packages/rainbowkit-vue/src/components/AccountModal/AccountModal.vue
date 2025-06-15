<script setup lang="ts">
import Dialog from "../Dialog/Dialog.vue";
import DialogContent from "../Dialog/DialogContent.vue";
import {useAccount, useDisconnect} from "@wagmi/vue";
import {useProfile} from "../../hooks/useProfile";
import ProfileDetails from "../ProfileDetails/ProfileDetails.vue";

const props = defineProps<{
  open: boolean,
}>();

const emit = defineEmits(['close']);

const { disconnect } = useDisconnect();
const { address } = useAccount();
const { balance, ensAvatar, ensName } = useProfile({
    address: address.value,
    includeBalance: props.open,
});

</script>

<template>
  <Dialog v-if="address" :open="open" @close="emit('close');" title-id="rk_account_modal_title">
    <DialogContent bottomSheetOnMobile padding="0">
      <ProfileDetails
        :address="address"
        :ensAvatar="ensAvatar"
        :ensName="ensName"
        :balance="balance"
        @close="emit('close')"
        @disconnect="disconnect"
      />
    </DialogContent>
  </Dialog>
</template>

