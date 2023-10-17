<template>
  <v-text-field class="mb-3" label="Timestamp" id="current-block-timestamp" v-model="expect.status"></v-text-field>
  <v-text-field class="mb-3" label="Nonce" id="status" v-model="expect.gas"></v-text-field>
  <v-text-field class="mb-3" label="Round" id="gas" v-model="expect.refund"></v-text-field>
  <v-list-item title="Outs" class="px-2 mb-1">
    <template v-slot:append>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card title="Outs" class="py-2">
            <template v-slot:text>
              <div class="d-flex mt-4">
                <v-text-field class="mr-1" v-model="newOut" label="Out" id="out"></v-text-field>
                <v-btn variant="plain" icon @click="() => {
                  expect.addOut(newOut)
                  newOut = null
                }"><v-icon icon="mdi-plus"></v-icon></v-btn>
              </div>
              <v-list class="mb-2">
                <v-list-item v-for="argument, i in expect.out" :title="argument">
                  <template v-slot:append>
                    <v-icon size="x-small" @click="expect.removeOut(i)" icon="mdi-minus"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </template>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Cancel" color="error" @click="isActive.value = false"></v-btn>
              <v-btn text="Save" color="info" @click="() => {
                isActive.value = false;
              }
                "></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-list-item>
  <v-list-item title="Logs" class="px-2 mb-4">
    <template v-slot:append>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card class="py-2">
            <template v-slot:title>
              <v-list-item>
              <v-list-item-title>
              <p class="text-h6">Logs</p>
              </v-list-item-title>
                <template v-slot:append>
                  <v-btn variant="plain" icon @click="expect.addLog(new Log())"><v-icon
                      icon="mdi-plus"></v-icon></v-btn>
                </template>
              </v-list-item>
            </template>
            <template v-slot:text>
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
                        <v-card title="Edit Log" class="py-2">
                          <template v-slot:text>
                            <LogForm :log="log" />
                          </template>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Cancel" color="error" @click="isActive.value = false"></v-btn>
                            <v-btn text="Save" color="info" @click="isActive.value = false"></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-icon size="x-small" @click="expect.removeLog(i)" icon="mdi-minus"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </template>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Cancel" color="error" @click="isActive.value = false"></v-btn>
              <v-btn text="Save" color="info" @click="() => {
                isActive.value = false;
              }
                "></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-list-item>
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