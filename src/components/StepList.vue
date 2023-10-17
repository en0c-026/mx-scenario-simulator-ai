<template>
  <v-expansion-panels v-model="activePanel">
    <v-expansion-panel v-for="(step, i) in scenarioFile.content.steps" :key="i" :index="i" :title="step.step">
      <template v-slot:text>
        <v-card class="py-4" border rounded="0" elevation="1">
          <v-card-text>
            <StepForm :step="step" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Remove" color="error" @click="() => {
              scenarioFile.content.removeStep(i)
              saveScenario()
            }"></v-btn>
            <v-btn color="info" text="Save" @click="() => {
              saveScenario()
              activePanel = false
              }"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { StepForm } from "@/components";
import { ref } from "vue";

defineProps({
  scenarioFile: Object,
  saveScenario: Function
})


const activePanel = ref(null)
</script>