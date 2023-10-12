<template>
  <v-list border height="280px" class="overflow-y-auto">
    <v-list-item v-for="(step, i) in store.selectedScenario.steps" :key="i" :index="i" :title="step.step">
      <template v-slot:prepend>
        <p class="mr-2">{{ i + 1 }}.</p>
      </template>
      <template v-slot:append>
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="plain" icon size="x-small"> <v-icon icon="mdi-pencil"></v-icon></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="Edit Step" class="py-4">
              <v-card-text>
                <StepForm :step="step" />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                <v-btn color="info" text="Save" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-btn icon variant="plain" size="small" @click="store.selectedScenario.removeStep(i)">
          <v-icon icon="mdi-minus"></v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>
<script setup>
import { useAppStore } from "../store/app";
import { StepForm } from "@components";
const store = useAppStore();

</script>