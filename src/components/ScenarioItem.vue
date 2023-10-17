<template>
  <v-list-item :title="scenarioFile.content?.name" :subtitle="scenarioFile.content?.description">
    <template v-slot:append>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="plain" icon size="x-small"> <v-icon
              icon="mdi-minus"></v-icon></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-text>
              Are you sure to remove the scenarioFile?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
              <v-btn color="error" text="Delete" @click="() => {
                store.removeFile(scenarioFile.path, scenarioFile.name)
                isActive.value = false
              }"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-list-item>
</template>
<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/store/app'
import { computed } from 'vue';

const props = defineProps({
  scenarioFile: Object,
  index: Number
})

const store = useAppStore()
const messages = ref([])

const readonly = ref(true)
const rules = {
  required: value => !!value || 'Required.',
  validExtensionFile: value => {
    const allowedExtensions = ['json'];
    const fileExtension = value.split('.').pop().toLowerCase(); // Obtener la extensión en minúsculas

    return allowedExtensions.includes(fileExtension) || 'Invalid file type. Only .json and .rust files are allowed.';
  }
}
</script>