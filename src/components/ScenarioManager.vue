<template>
  <p class="text-h6">Manage Scenario</p>
  <v-list>
    <v-list-item title="Steps">
      <template v-slot:append>
        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-btn variant="plain" size="small" v-bind="props" icon>
              <v-icon icon="mdi-plus"></v-icon>
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card title="New Step">
              <template v-slot:text>
                <v-select v-model="newStepType" variant="solo-filled" label="Type" :items="stepsTypes"></v-select>
              </template>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                <v-btn text="Add" @click="() => {
                  store.selectedScenario.addStep(newStepType);
                  isActive.value = false;
                }
                  "></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-list-item>
  </v-list>
  <StepList />
</template>

<script setup>
import { StepForm, StepList } from '@components'
import { useAppStore } from "../store/app";
import { ref } from 'vue';
const store = useAppStore();

const stepsTypes = [
  "externalStep",
  "setState",
  "checkState",
  "dumpState",
  "scCall",
  "scQuery",
  "scDeploy",
  "transfer",
  "validatorReward",
];

const newStepType = ref(null);
</script>