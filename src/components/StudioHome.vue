<template>
  <v-sheet height="90%" class="w-100 d-flex flex-column align-center justify-center bg-transparent">
    <v-card border rounded="0" class="px-1 py-2" title="New Project" width="420px">
      <v-card-text class="py-2">
        <v-text-field v-model="projectName" label="Name"></v-text-field>
        <v-select v-model="template" class="mt-4" :items="projectTemplates" label="Template"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="store.refechLoading" color="info" @click="handleCreate">Create</v-btn>
      </v-card-actions>
    </v-card>
    <v-card border rounded="0" width="420px" class="py-4 px-1 mt-2" title="Latest Projects">
      <v-card-text class="py-2">
        <p v-if="!store.latestProjects.length > 0" class="text-caption text-grey-darken-3 text-center my-4">No projects found, please create
          one.</p>
        <v-list-item border class="px-2" v-for="latestProject in store.latestProjects" :title="latestProject"
          @click="store.selectProjectPath(latestProject)">
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
const store = useAppStore();

const projectTemplates = ref([
  "adder",
  "bonding-curve-contract",
  "check-pause",
  "crowdfunding-esdt",
  "crypto-bubbles",
  "crypto-zombies",
  "digital-cash",
  "empty",
  "esdt-transfer-with-fee",
  "factorial",
  "fractional-nfts",
  "lottery-esdt",
  "multisig",
  "nft-minter",
  "nft-storage-prepay",
  "nft-subscription",
  "ping-pong-egld",
  "proxy-pause",
  "rewards-distribution",
  "seed-nft-minter",
  "token-release"
])

const projectName = ref(null)
const template = ref(null)

const handleCreate = () => {
  store.refechLoading = true
  store.projectPath = projectName.value
  store.executeCommand(`mxpy contract new ${projectName.value} --template ${template.value}`)
  projectName.value = null
  template.value = null
}
</script>