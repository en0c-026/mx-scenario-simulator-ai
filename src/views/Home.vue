<template>
  <v-sheet height="100%" class="overflow-y-hidden" width="100%">
    <v-card rounded="0" height="100%" width="100%">
      <v-tabs v-model="store.currentTab" bg-color="grey-darken-3" color="warning">
        <v-tab value="one">Code</v-tab>
        <v-tab value="two">Scenario Manager</v-tab>
        <v-tab value="three">Run</v-tab>
      </v-tabs>
      <v-card-text class="pa-0 h-100">
        <v-window v-model="store.currentTab" class="h-100">
          <v-window-item value="one" class="h-100">
            <CodeEditor v-if="store.selectedFile" />
          </v-window-item>
          <v-window-item value="two" class="h-100">
            <ScenarioManager />
          </v-window-item>
          <v-window-item value="three" class="h-75 bg-error">
            <Console />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { CodeEditor, ScenarioManager, Console } from "@/components"
const store = useAppStore();
</script>
