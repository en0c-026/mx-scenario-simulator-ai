<template>
  <codemirror  v-model="store.selectedFile.content" placeholder="Code goes here..." :style="{
    height: '100%',
    width: '100%'
  }" :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @blur="store.uploadFile(store.selectedFile.path, store.selectedFile)" />
</template>
<script setup>

import { Codemirror } from "vue-codemirror";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { markdown } from "@codemirror/lang-markdown";
import { rust } from "@codemirror/lang-rust";

import { oneDark } from "@codemirror/theme-one-dark";
import { useAppStore } from "../store/app";
import { computed } from "vue";

const store = useAppStore();

const extFunctions = {
  py: python,
  js: javascript,
  json: json,
  rs: rust,
  md: markdown
}
const extensions = computed(() => {
  const language = extFunctions[store.selectedFile.extension]
  return [language?.(), oneDark]
})


</script>