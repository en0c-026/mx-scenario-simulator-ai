<template>
  <v-text-field class="mb-1" label="Timestamp" id="current-block-timestamp" v-model="expect.status"></v-text-field>
  <v-text-field class="mb-1" label="Nonce" id="status" v-model="expect.gas"></v-text-field>
  <v-text-field class="mb-1" label="Round" id="gas" v-model="expect.refund"></v-text-field>
  <v-expansion-panels>
    <v-expansion-panel title="Outs">
      <template v-slot:text>
        <div class="d-flex">
          <v-text-field class="mr-1" v-model="newOut" label="Out" id="out">
            <template v-slot:append>
              <v-btn variant="plain" icon @click="expect.addOut(newOut)" height="56px"><v-icon
                  icon="mdi-plus"></v-icon></v-btn>
            </template>
          </v-text-field>
        </div>
        <v-list class="mb-2">
          <v-list-item v-for="argument, i in expect.out" :title="argument">
            <template v-slot:append>
              <v-btn icon variant="plain" @click="expect.removeOut(i)"><v-icon icon="mdi-minus"></v-icon></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </template>
    </v-expansion-panel>
    <v-expansion-panel v-if="type !== 'scQuery'" title="Logs">
      <template v-slot:text>
        <div class="d-flex">
          <v-btn variant="plain" size="small" icon @click="expect.addLog(new Log())"><v-icon
              icon="mdi-plus"></v-icon></v-btn>
        </div>
        <v-list class="mb-2">
          <v-list-item v-for="log, i in expect.logs" :title="i + 1">
            <template v-slot:append>
              <v-dialog width="500">
                <template v-slot:activator="{ props }">
                  <v-btn variant="plain" size="x-small" v-bind="props" icon>
                    <v-icon icon="mdi-pencil"></v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card title="Edit Log">
                    <template v-slot:text>
                      <LogForm :log="log" />
                    </template>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text="Close" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-btn icon variant="plain" size="x-small" @click="expect.removeLog(i)"><v-icon icon="mdi-minus"></v-icon></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </template>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref } from 'vue';
import { Log } from '@utils'
import { LogForm } from '@components'

defineProps({
  type: String,
  expect: Object
})

const newOut = ref(null)

</script>