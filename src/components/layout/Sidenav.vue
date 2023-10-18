<template>
  <v-sheet min-height="75%" class="d-flex flex-column">
    <v-list-item v-if="store.projectPath && store.files.length > 0" title="Project" class="py-2">
      <template v-slot:append>
        <v-btn variant="plain" @click="store.downloadProject()" size="x-small" icon rounded="0"><v-icon
              icon="mdi-cloud-download-outline"></v-icon></v-btn>
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
    <v-divider></v-divider>
    <p v-if="!store.projectPath" class="text-subtitle-2 my-auto text-center">No project selected.</p>
    <FileItem v-for="file, i in store.files" :key="i" :file="file" />
  </v-sheet>
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
  "toml"
]
</script>