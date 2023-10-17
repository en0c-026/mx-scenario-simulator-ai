<template>
  <v-sheet min-height="80%" color="transparent" class="px-4 bg-info">
    <p class="ma-auto" v-if="!isGreaterThanZero">Please create a Scenario!</p>
    <p class="ma-auto" v-else-if="!isSelectedScenario">Please select a Scenario!</p>
    <div v-else class="w-100">
      <p class="text-h6" @click="arre">Manage</p>
      <div style="min-height='48px'">
        <p class="text-subtitle-1">{{ selectedScenarioContent.name }}</p>
        <p class="text-subtitle-2">{{ selectedScenarioContent.description }}</p>
      </div>
      <v-text-field label="Name" :model-value="newSelectedScenarioName"
        @update:model-value="(e) => updateSelectedScenarioContent(e)" @update:focused="arre"></v-text-field>
      <v-text-field label="Description" :model-value="newSelectedScenarioDescription"
        @update:model-value="(e) => updateSelectedScenarioContent(null, e)" @update:focused="arre"></v-text-field>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';

const arre = (e) => {
  console.log(e);
}
const props = defineProps({
  isGreaterThanZero: Boolean,
  isSelectedScenario: Boolean,
  selectedScenarioContent: Object,
  newSelectedScenarioName: ref,
  newSelectedScenarioDescription: ref,
  updateSelectedScenarioContent: Function
})

const newSelectedScenarioName = ref(null)
const newSelectedScenarioDescription = ref(null)

</script>