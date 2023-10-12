<template>
  <v-list-item class="pb-0">
    <template v-slot:default>
      <v-text-field @click:control="store.selectScenario(index)" hide-details variant="plain" :readonly="readonly" v-model="scenario.name">
        <template v-slot:append>
          <v-btn variant="plain" icon size="x-small" @click="readonly = !readonly"> <v-icon
              :icon="readonly ? 'mdi-pencil' : 'mdi-check'"></v-icon></v-btn>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="plain" icon size="x-small"> <v-icon icon="mdi-minus"></v-icon></v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-card-text>
                  Are you sure to remove the scenario?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                  <v-btn color="error" text="Delete" @click="() => {
                    store.deleteScenario(index)
                    isActive.value = false
                  }"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </v-text-field>
    </template>
  </v-list-item>
</template>
<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store/app'
const store = useAppStore()

defineProps({
  scenario: Object,
  index: Number
})
const readonly = ref(true)

</script>