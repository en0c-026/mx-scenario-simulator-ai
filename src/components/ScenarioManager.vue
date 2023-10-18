<template>
  <v-sheet v-if="!scenariosFolder || store.refechLoading" class="d-flex w-100 h-75">
    <v-progress-circular class="ma-auto" size="40" indeterminate></v-progress-circular>
  </v-sheet>
  <v-sheet v-else-if="!scenariosFolder.exists && !store.refechLoading" class="d-flex flex-column align-center justify-center w-100 h-75">
    <p class="mb-2">The scenarios folder does not exist, please create it.</p>
        <v-btn @click="store.newFolder('scenarios', true)">create</v-btn>
  </v-sheet>
  <v-container v-else class="fill-height pa-0 overflow-y-auto" fluid>
    <v-row class="h-100" no-gutters>
      <v-col cols="12" lg="3" xl="2" class="px-lg-0 d-flex justify-center">
        <v-list class="pa-0 w-100" max-width="868px">
          <v-list-item title="Scenarios">
            <template v-slot:append>
              <v-btn @click="createScenario" variant="plain" size="x-small" icon>
                <v-icon icon="mdi-plus"></v-icon>
              </v-btn>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <ScenarioItem v-for="scenarioFile, i in scenariosFolder.list" @click="selectScenarioFile(scenarioFile)" :key="i"
            :index="i" :scenarioFile="scenarioFile" />
        </v-list>
      </v-col>
      <v-col class="bg-grey-lighten-4 py-2 px-4 ">
        <v-container class="px-lg-16 d-flex h-100  ">
          <p class="ma-auto" v-if="!scenariosFolder.list.length > 0">Please create a Scenario!</p>
          <p class="ma-auto" v-else-if="!selectedScenarioFile">Please select a Scenario!</p>
          <div v-else class="w-100 ">
            <p class="text-h6">Manage</p>
            <p class="subtitle-1 mb-4">{{ selectedScenarioFile.name }}</p>
            <v-form class="mb-4">
              <v-text-field class="mb-2"  label="Name"
                v-model="selectedScenarioFile.content.name" @update:focused="saveSelectedScenario"></v-text-field>
              <v-text-field  label="Description"
                v-model="selectedScenarioFile.content.description" @update:focused="saveSelectedScenario"></v-text-field>
            </v-form>
            <v-list-item class="px-2">
              <template v-slot:title>
                <p class="text-h6">Steps</p>
              </template>
              <template v-slot:append>
                <v-dialog width="500">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon variant="plain">
                      <v-icon icon="mdi-plus"></v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card title="New Step" class="py-2">
                      <template v-slot:text>
                        <v-select v-model="newStepType" label="Type" :items="stepsTypes"></v-select>
                      </template>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text="Cancel" color="error" @click="isActive.value = false"></v-btn>
                        <v-btn text="Add" color="info" @click="() => {
                          selectedScenarioFile.content.addStep(newStepType);
                          isActive.value = false;
                        }
                          "></v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </template>
            </v-list-item>
            <v-sheet border>
              <StepList :scenarioFile="selectedScenarioFile" :saveScenario="saveSelectedScenario" />

            </v-sheet>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { StepList, ScenarioItem } from '@/components'
import { useAppStore } from "@/store/app";
import { Scenario, Step } from '@/utils';
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
const scenariosFolder = computed(() => {
  const index = store.files.findIndex(file => file.is_folder && file.name === "scenarios")
  const exists = index !== -1
  let list = []

  if (exists && store.files[index]?.content) {
    list = store.files[index].content.map(scenarioFile => {
      try {
        if (typeof scenarioFile.content === 'string') {
          scenarioFile.content = new Scenario(JSON.parse(scenarioFile.content));
        } else {
          scenarioFile.content = new Scenario(scenarioFile.content);
        }

        if (scenarioFile.content.steps.length > 0) {
          // console.log('scenarioFile from map, there is steps!', scenarioFile);
          scenarioFile.content.steps = scenarioFile.content.steps.map(step => new Step(step.step, step))
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
      return scenarioFile;
    });
  }
  return {
    exists,
    index,
    list
  }
})

const selectedScenarioFile = ref(null)
// watch(selectedScenarioFile, (v, o) => console.log('from watch v', v, 'o', o))
const selectScenarioFile = (scenarioFile) => {
  if (scenarioFile.content.name === 'Invalid JSON') {
    return
  }
  selectedScenarioFile.value = scenarioFile
}

const createScenario = () => {
  if (!scenariosFolder.value.exists) {
    return
  }
  const folder = store.files[scenariosFolder.value.index]
  const filesLength = folder.content.length
  store.selectPath(`${folder.path}/${folder.name}`)
  store.newFile('json', filesLength > 0 ? `new-scenario-${filesLength + 1}.json` : 'new-scenario.json', JSON.stringify({
    name: "My Scenario",
    description: "",
    steps: []
  }, null, 4))
}

const saveSelectedScenario = async (focused) => {
  if (!selectedScenarioFile.value) return
  if (focused) {
    return
  } else {
    await store.uploadFile(selectedScenarioFile.value.path, selectedScenarioFile.value)
  }
}
const newStepType = ref(null);
</script>