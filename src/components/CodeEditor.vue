<template>
  <codemirror v-model="code" placeholder="Code goes here..." :style="{
    minHeight: '400px',
    width: '100%'
  }" :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" />
</template>
<script setup>

import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import { useAppStore } from "../store/app";
import { computed } from "vue";

const store = useAppStore();
const code = computed(() => {
  return JSON.stringify(store.selectedScenario, null, 2);
});

const extensions = [json(), oneDark];

</script>