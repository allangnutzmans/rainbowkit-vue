<script setup lang="ts">
import { ConnectButton, WalletButton } from 'rainbowkit-vue';

</script>

<template>
  <div class="border">
    <ConnectButton
        :accountStatus="'avatar'"
        :showBalance="{ largeScreen: false, smallScreen: false }"
        :chainStatus="{ largeScreen: 'icon', smallScreen: 'icon' }"
        label="My Wallet"
    />
    <WalletButton />
  </div>
</template>