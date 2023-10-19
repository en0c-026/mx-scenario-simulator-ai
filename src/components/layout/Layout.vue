<template>
  <v-sheet v-if="store.loading" height="100vh" class="w-100 d-flex overflow-none" color="grey-lighten-2">
    <v-progress-circular class="ma-auto" size="48" indeterminate></v-progress-circular>
  </v-sheet>
  <v-layout v-else class="rounded rounded-md">
    <Header />
    <v-navigation-drawer v-model="store.showSidenav">
      <Sidenav />
    </v-navigation-drawer>
    <v-main style="height: 100vh;">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import { Sidenav, Header } from '@/components'
import { useAppStore } from "@/store/app";
import { onMounted } from 'vue';
import { watch } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const store = useAppStore();
const { lg } = useDisplay()
onMounted(() => {
  console.log('lg on mounted', lg);
  if (lg.value) {
    store.showSidenav = true
  }
})
watch(lg, () => {
  console.log('lg uptaded');
})
</script>
