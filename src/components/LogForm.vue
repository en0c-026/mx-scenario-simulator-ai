<template>
 <v-text-field class="mb-3 mt-4" label="Address" id="address" v-model="log.address"></v-text-field>
      <v-text-field class="mb-3" label="Endpoint" id="endpoint" v-model="log.endpoint"></v-text-field>
      <v-text-field class="mb-3" label="Data" id="data" v-model="log.data"></v-text-field>
      <div class="d-flex">
        <v-text-field v-model="newTopic" class="mr-1" label="Topic" id="topic">
        </v-text-field>
        <v-btn variant="plain" :disabled="!newTopic" icon @click="log.addTopic(newTopic)"><v-icon
            icon="mdi-plus"></v-icon></v-btn>
      </div>
      <v-list class="mb-4">
        <v-list-item v-for="topic, i in log.topics" :title="topic">
          <template v-slot:append>
            <v-icon size="x-small" @click="log.removeTopic(i)" icon="mdi-minus"></v-icon>
          </template>
        </v-list-item>
      </v-list>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  log: Object
})
const newTopic = ref(null)
</script>