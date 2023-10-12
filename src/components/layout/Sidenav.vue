<template>
  <v-list>
    <v-list-item title="Scenarios">
      <template v-slot:append>
        <v-btn @click="store.addScenario('new-scenario.json')" size="x-small" icon rounded="0"><v-icon icon="mdi-plus"></v-icon></v-btn>
      </template>
    </v-list-item>
  </v-list>
  <ScenarioItem v-for="scenario, i in store.scenarios" :key="i" :index="i" :scenario="scenario" />
</template>

<script setup>
import { useAppStore } from '../store/app'
import { ScenarioItem } from '@/components';
const store = useAppStore()
</script>