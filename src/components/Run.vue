<template>
  <v-sheet class="pa-10">
    <p class="text-body-1 mb-2">Available Commands:</p>
    <v-btn elevation="1" @click="store.clearLogs()">clear</v-btn>
    <v-btn elevation="1" @click="store.executeCommand('mxpy contract build', store.projectPath)">build</v-btn>
    <v-btn elevation="1" @click="store.executeCommand('mxpy contract test', store.projectPath)">test</v-btn>
  </v-sheet>
  <div ref="consoleRef" class="bg-grey-darken-4 overflow-y-auto pt-2 px-4 pb-12 h-100">
    <div v-for="log in store.logs">
      <p v-if="log.startsWith('scenariomx-studio$')">
        <span :class="getLogColor(log)">{{ splitCommand(log)[0] }}</span>
        {{ splitCommand(log)[1] }}
      </p>
      <p v-else :class="getLogColor(log)">{{ log }}</p>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app';
import { nextTick, ref, watch } from 'vue';
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
  } else if (log.startsWith('scenariomx-studio$')) {
    logClass = 'text-light-green-accent-3 font-weight-bold'
  }
  return logClass
}
watch(store, () => {
  scrollToBottom()
})
const splitCommand = (c) => {
  const chunks = c.split('$')
  return [`${chunks[0]}$`, chunks[1]]
}
const scrollToBottom = () => {
  nextTick(() => {
    const consoleElement = consoleRef.value;
    if (consoleElement) {
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }
  });
};
</script>