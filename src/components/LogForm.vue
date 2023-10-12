<template>
  <div class="pa-2">
    <v-text-field class="mb-1" label="Address" id="address" v-model="log.address"></v-text-field>
    <v-text-field class="mb-1" label="Endpoint" id="endpoint" v-model="log.endpoint"></v-text-field>
    <v-text-field class="mb-1" label="Data" id="data" v-model="log.data"></v-text-field>
    <div class="d-flex">
      <v-text-field v-model="newTopic" class="mr-1" label="Topic" id="topic">
      </v-text-field>
      <v-btn variant="plain" :disabled="!newTopic" icon @click="log.addTopic(newTopic)" height="56px"><v-icon
          icon="mdi-plus"></v-icon></v-btn>
    </div>
    <v-list class="mb-2">
      <v-list-item v-for="topic, i in log.topics" :title="topic">
        <template v-slot:append>
          <v-btn size="x-small" icon variant="plain" @click="log.removeTopic(i)"><v-icon icon="mdi-minus"></v-icon></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  log: Object
})
const newTopic = ref(null)
</script>