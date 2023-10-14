<template>
  <FileItem v-for="file, i in files" :key="i" :file="file" />
</template>

<script setup>
import { FileItem } from '@/components';
defineProps({
  files: Array
})
</script>