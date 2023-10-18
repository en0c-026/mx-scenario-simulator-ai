<template>
    <v-app-bar color="warning">
      <template v-slot:prepend><v-app-bar-nav-icon v-if="store.projectPath && store.files.length > 0" variant="text" @click.stop="store.showSidenav = !store.showSidenav"></v-app-bar-nav-icon></template>
      <template v-slot:title>
        <p class="font-weight-bold">ScenarioMx Studio</p>
      </template>
    </v-app-bar>
</template>

<script setup>
import { useAppStore } from '@/store/app';
const store = useAppStore()
</script>