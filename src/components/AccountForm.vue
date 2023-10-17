<template>
  <v-form>
    <v-text-field class="mb-2" v-if="type === address" v-model="account.comment" label="Comment"></v-text-field>
    <v-text-field class="mb-2" v-model="account.nonce" label="Nonce"></v-text-field>
    <v-text-field class="mb-2" v-model="account.balance" label="Balance"></v-text-field>
    <div class="d-flex">
      <v-text-field class="mb-2 mr-1" hide-details v-model="newEsdtToken.name" label="ESDT Token Name"
        id="esdt-token-name"></v-text-field>
      <v-text-field class="mb-2" hide-details v-model="newEsdtToken.amount" label="ESDT Token Amount"
        id="esdt-token-amount"></v-text-field>
      <v-btn variant="plain" color="info" icon @click="account.addEsdt(newEsdtToken.name, newEsdtToken.amount)"
        :disabled="!newEsdtToken.name || !newEsdtToken.amount"><v-icon icon="mdi-plus"></v-icon></v-btn>
    </div>
    <v-list>
      <v-list-item v-for="[key, value] in Object.entries(account.esdt)" :title="key" :subtitle="value">
        <template v-slot:append>
          <v-icon icon="mdi-minus" size="small" @click="account.removeEsdt(key)"></v-icon>
        </template>
      </v-list-item>
    </v-list>
    <v-text-field class="mb-2" v-if="type === address" v-model="account.username" label="Username"></v-text-field>
    <v-text-field class="mb-2" v-model="account.code" label="Code"></v-text-field>
    <div class="d-flex">
      <v-text-field class="mb-2 mr-1" hide-details v-model="newStorageEntry.key" label="Storage Key"
        id="storage-key"></v-text-field>
      <v-text-field class="mb-2" hide-details v-model="newStorageEntry.value" label="Storage Value"
        id="storage-value"></v-text-field>
      <v-btn variant="plain" color="info" icon
        @click="account.addStorageEntry(newStorageEntry.key, newStorageEntry.value)"
        :disabled="!newStorageEntry.key || !newStorageEntry.value">
        <v-icon icon="mdi-plus"></v-icon></v-btn>
    </div>
    <v-list>
      <v-list-item v-for="[key, value] in Object.entries(account.storage)" :title="key" :subtitle="value">
        <template v-slot:append>
          <v-icon icon="mdi-minus" @click="account.removeStorageEntry(key)"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-form>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  type: String,
  account: Object
})
const newEsdtToken = ref({
  name: null,
  amount: null
})
const newStorageEntry = ref({
  key: null,
  value: null
})

</script>