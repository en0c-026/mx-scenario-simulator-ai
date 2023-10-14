<template>
  <v-list>
    <v-list-item title="Project">
      <template v-slot:append>
        <v-btn variant="plain" @click="store.newFolder()" size="x-small" icon rounded="0"><v-icon
            icon="mdi-folder-plus-outline"></v-icon></v-btn>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn variant="plain" v-bind="props" size="x-small" icon rounded="0"><v-icon
                icon="mdi-file-plus-outline"></v-icon></v-btn>
          </template>
          <v-sheet color="surface">
            <v-list-item v-for="allowedType in allowedTypes" @click="store.newFile(allowedType)"
              :title="allowedType"></v-list-item>
          </v-sheet>
        </v-menu>
      </template>
    </v-list-item>
  </v-list>
  <FileItem v-for="file, i in store.files" :key="i" :file="file" />
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { FileItem } from '@/components';

const store = useAppStore()
const allowedTypes = [
  "json",
  "txt",
  "md",
  "rs",
  "py",

  
  "wasm",
  "toml"
]
</script>