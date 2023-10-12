<template>
  <v-sheet min-height="90vh" height="100%" width="100%">
    <v-container class="fill-height align-start">
      <v-row v-if="store.selectedScenario" class="fill-height" no-gutters>
        <v-col md="8" lg="7">
          <v-sheet class="pa-6">
            <ScenarioManager />
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <CodeEditor />
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup>
import { useAppStore } from "../store/app";
import { CodeEditor, ScenarioManager } from "@components";
const store = useAppStore();

</script>
