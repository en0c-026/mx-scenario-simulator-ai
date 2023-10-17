<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <div v-bind="props">
        <v-text-field :hide-details="!showDetails" @click:control="handleSelectFile" variant="plain" class="px-2"
          v-model="fileName" :readonly="!file.editing" :focused="file.editing">
          <template v-slot:prepend-inner>
            <v-icon v-if="file.is_folder" @click="file.toggleFolder()" size="small"
              :icon="!file.open ? 'mdi-chevron-right' : 'mdi-chevron-down'" class="my-auto"></v-icon>
          </template>
          <template v-slot:details>
            <div class="w-100">
              <FileList :files="file.content" />
            </div>
          </template>
          <template v-slot:append-inner>
            <div v-if="isHovering" class="d-flex h-100">
              <v-icon @click="handleRenameFile" class="my-auto mr-1" size="x-small"
                :icon="!file.editing ? 'mdi-pencil' : 'mdi-check'"></v-icon>
              <v-icon @click="showDeleteDialog = !showDeleteDialog" size="x-small" class="my-auto"
                icon="mdi-minus"></v-icon>
            </div>
          </template>
        </v-text-field>
      </div>

    </template>
  </v-hover>
  <v-dialog width="500" v-model="showDeleteDialog">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          Are you sure to remove this file?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
          <v-btn color="error" text="Delete" @click="() => {
            store.removeFile(file.path, file.name)
            isActive.value = false
          }"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { FileList } from '@/components'
import { ref, computed } from 'vue';
const store = useAppStore()
const showDeleteDialog = ref(false)

const props = defineProps({
  file: Object
})

const handleSelectFile = () => {
  if (props.file.is_folder) {
    store.selectPath(`${props.file.path}/${props.file.name}`)
  } else {
    store.selectPath(props.file.path)
    store.selectFile(props.file)
    store.currentTab = 0
  }
}
const fileName = ref(props.file.name)
const handleRenameFile = async () => {
  if (props.file.editing) {
    await store.renameFile(`${props.file.path}/${props.file.name}`, fileName.value)
  } else {
    props.file.toggleEditing()
  }
}
const showDetails = computed(() => {
  return props.file.is_folder && props.file.open && props.file.content.length > 0
})
</script>