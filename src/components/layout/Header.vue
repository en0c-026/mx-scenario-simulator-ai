<template>
    <v-app-bar color="orange-darken-1">
      <template v-slot:prepend><v-app-bar-nav-icon v-if="store.projectPath && store.files.length > 0" variant="text" @click.stop="store.showSidenav = !store.showSidenav"></v-app-bar-nav-icon></template>
      <template v-slot:title>
        <v-img src="/scenario-mx-studio-logo-2.png" width="280px"></v-img>
      </template>
    </v-app-bar>
</template>

<script setup>
import { useAppStore } from '@/store/app';
const store = useAppStore()
</script>