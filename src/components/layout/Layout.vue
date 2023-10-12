<template>
  <v-layout class="rounded rounded-md">
    <Header />
    <v-navigation-drawer permanent>
      <Sidenav />
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh;">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import Sidenav from './Sidenav.vue'
import Header from './Header.vue'
</script>
