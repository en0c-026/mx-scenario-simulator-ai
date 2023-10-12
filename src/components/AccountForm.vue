<template>
  <v-form>
    <v-text-field v-if="type === address" v-model="account.comment" label="Comment"></v-text-field>
    <v-text-field v-model="account.nonce" label="Nonce"></v-text-field>
    <v-text-field v-model="account.balance" label="Balance"></v-text-field>
    <div class="d-flex">
      <v-text-field hide-details v-model="newEsdtToken.name" class="mr-1" label="ESDT Token Name" id="esdt-token-name"></v-text-field>
      <v-text-field hide-details v-model="newEsdtToken.amount" class="mr-1" label="ESDT Token Amount"
        id="esdt-token-amount"></v-text-field>
      <v-btn variant="plain" icon @click="account.addEsdt(newEsdtToken.name, newEsdtToken.amount)" height="56px"
        :disabled="!newEsdtToken.name || !newEsdtToken.amount"><v-icon icon="mdi-plus"></v-icon></v-btn>
    </div>
    <v-list>
      <v-list-item v-for="[key, value] in Object.entries(account.esdt)" :title="key" :subtitle="value">
        <template v-slot:append>
          <v-btn icon size="small" @click="account.removeEsdt(key)">
            <v-icon icon="mdi-minus"></v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-text-field v-if="type === address" v-model="account.username" label="Username"></v-text-field>
    <v-text-field v-model="account.code" label="Code"></v-text-field>
    <div class="d-flex">
      <v-text-field hide-details v-model="newStorageEntry.key" class="mr-1" label="Storage Key" id="storage-key"></v-text-field>
      <v-text-field hide-details v-model="newStorageEntry.value" class="mr-1" label="Storage Value" id="storage-value"></v-text-field>
      <v-btn variant="plain" icon @click="account.addStorageEntry(newStorageEntry.key, newStorageEntry.value)" height="56px"
        :disabled="!newStorageEntry.key || !newStorageEntry.value"><v-icon icon="mdi-plus"></v-icon></v-btn>
    </div>
    <v-list>
      <v-list-item v-for="[key, value] in Object.entries(account.storage)" :title="key" :subtitle="value">
        <template v-slot:append>
          <v-btn icon size="small" @click="account.removeStorageEntry(key)">
            <v-icon icon="mdi-minus"></v-icon>
          </v-btn>
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