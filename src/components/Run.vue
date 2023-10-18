<template>
  <v-sheet class="pa-10">
    <p class="text-body-1 mb-2">Available Commands:</p>
    <v-btn elevation="1" @click="store.clearLogs()">clear</v-btn>
    <v-btn elevation="1" @click="store.executeCommand('mxpy contract build', store.projectPath)">build</v-btn>
    <v-btn elevation="1" @click="store.executeCommand('mxpy contract test', store.projectPath)">test</v-btn>
  </v-sheet>
  <div ref="consoleRef" @vnode-updated="scrollToBottom" class="bg-grey-darken-4 overflow-y-auto pt-2 px-4 pb-12 h-100">
    <p v-for="log in store.logs" :class="getLogColor(log)">
      {{ log }}
    </p>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app';
import { nextTick, ref } from 'vue';
const store = useAppStore();
const consoleRef = ref(null)
const getLogColor = (log) => {
  let logClass
  if (log.startsWith('ERROR')) {
    logClass = 'text-red-lighten-1 font-weight-bold'
  } else if (log.startsWith('INFO')) {
    logClass = 'text-blue-lighten-3 font-weight-bold'
  } else if (log.startsWith('PENDING')) {
    logClass = 'text-yellow-lighten-1 font-weight-bold'
  }
  return logClass
}
const scrollToBottom = () => {
  nextTick(() => {
    const consoleElement = consoleRef.value;
    if (consoleElement) {
      // Hacer scroll al final del elemento
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }
  });
};
</script>