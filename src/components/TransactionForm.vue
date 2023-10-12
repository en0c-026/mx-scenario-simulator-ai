<template>
  <div class="pa-2">
    <div v-if="step.step === 'scCall'">
      <v-text-field class="mb-1" label="From" id="from" v-model="step.tx.from"></v-text-field>
      <v-text-field class="mb-1" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-1" label="Egld Value" id="egld-value" v-model="step.tx.egldValue"></v-text-field>
      <v-text-field class="mb-1" label="Function" id="function" v-model="step.tx.function"></v-text-field>
      <v-text-field class="mb-1" label="Gas Limit" id="gas-limit" v-model="step.tx.gasLimit"></v-text-field>
      <v-text-field class="mb-1" label="Gas Price" id="gas-price" v-model="step.tx.gasPrice"></v-text-field>
      <v-expansion-panels>
        <v-expansion-panel title="Esdt Value">
          <template v-slot:text>
            <div class="d-flex">
              <v-text-field v-model="newEsdtValue.tokenIdentifier" class="mr-1 mb-1" label="Token Identifier"
                id="token-identifier">
              </v-text-field>
              <v-text-field v-model="newEsdtValue.nonce" class="mb-1" label="Nonce" id="nonce">
              </v-text-field>
            </div>
            <div class="d-flex">
              <v-text-field v-model="newEsdtValue.value" class="mr-1" label="Value" id="value">
              </v-text-field>
              <v-btn variant="plain" icon @click="step.tx.addEsdt(newEsdtValue)" height="56px"><v-icon
                  icon="mdi-plus"></v-icon></v-btn>
            </div>
            <v-list class="mb-2">
              <v-list-item class="px-1" v-for="esdt, i in step.tx.esdtValue" :title="esdt.tokenIdentifier"
                :subtitle="`${esdt.value}; ${esdt.nonce}`">
                <template v-slot:append>
                  <v-btn icon variant="plain" @click="step.tx.removeEsdt(i)"><v-icon icon="mdi-minus"></v-icon></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panel>
        <v-expansion-panel title="Arguments">
          <template v-slot:text>
            <div class="d-flex">
              <v-text-field class="mr-1" v-model="newArgument" label="Argument" id="argument">
                <template v-slot:append>
                  <v-btn variant="plain" icon @click="step.tx.addArgument(newArgument)" height="56px"><v-icon
                      icon="mdi-plus"></v-icon></v-btn>
                </template>
              </v-text-field>
            </div>
            <v-list class="mb-2">
              <v-list-item class="px-1" v-for="argument, i in step.tx.arguments" :title="argument">
                <template v-slot:append>
                  <v-btn icon variant="plain" @click="step.tx.removeArgument(i)"><v-icon
                      icon="mdi-minus"></v-icon></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="step.step === 'scQuery'">
      <v-text-field class="mb-1" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-1" label="Function" id="function" v-model="step.tx.function"></v-text-field>
      <v-expansion-panels>
        <v-expansion-panel title="Arguments">
          <template v-slot:text>
            <div class="d-flex">
              <v-text-field class="mr-1" v-model="newArgument" label="Argument" id="argument">
                <template v-slot:append>
                  <v-btn variant="plain" icon @click="step.tx.addArgument(newArgument)" height="56px"><v-icon
                      icon="mdi-plus"></v-icon></v-btn>
                </template>
              </v-text-field>
            </div>
            <v-list class="mb-2">
              <v-list-item class="px-1" v-for="argument, i in step.tx.arguments" :title="argument">
                <template v-slot:append>
                  <v-btn icon variant="plain" @click="step.tx.removeArgument(i)"><v-icon
                      icon="mdi-minus"></v-icon></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="step.step === 'scDeploy'">
      <v-text-field class="mb-1" label="From" id="from" v-model="step.tx.from"></v-text-field>
      <v-text-field class="mb-1" label="Contract Code" id="contract-code" v-model="step.tx.contractCode"></v-text-field>
      <v-text-field class="mb-1" label="Value" id="value" v-model="step.tx.value"></v-text-field>
      <v-text-field class="mb-1" label="Function" id="function" v-model="step.tx.function"></v-text-field>
      <v-text-field class="mb-1" label="Gas Limit" id="gas-limit" v-model="step.tx.gasLimit"></v-text-field>
      <v-text-field class="mb-1" label="Gas Price" id="gas-price" v-model="step.tx.gasPrice"></v-text-field>
      <v-expansion-panels>
        <v-expansion-panel title="Arguments">
          <template v-slot:text>
            <div class="d-flex">
              <v-text-field class="mr-1" v-model="newArgument" label="Argument" id="argument">
                <template v-slot:append>
                  <v-btn variant="plain" icon @click="step.tx.addArgument(newArgument)" height="56px"><v-icon
                      icon="mdi-plus"></v-icon></v-btn>
                </template>
              </v-text-field>
            </div>
            <v-list class="mb-2">
              <v-list-item class="px-1" v-for="argument, i in step.tx.arguments" :title="argument">
                <template v-slot:append>
                  <v-btn icon variant="plain" @click="step.tx.removeArgument(i)"><v-icon
                      icon="mdi-minus"></v-icon></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="step.step === 'transfer'">
      <v-text-field class="mb-1" label="From" id="from" v-model="step.tx.from"></v-text-field>
      <v-text-field class="mb-1" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-1" label="Egld Value" id="egld-value" v-model="step.tx.egldValue"></v-text-field>
      <v-expansion-panels>
        <v-expansion-panel title="Esdt Value">
          <template v-slot:text>
            <div class="d-flex">
              <v-text-field v-model="newEsdtValue.tokenIdentifier" class="mr-1 mb-1" label="Token Identifier"
                id="token-identifier">
              </v-text-field>
              <v-text-field v-model="newEsdtValue.nonce" class="mb-1" label="Nonce" id="nonce">
              </v-text-field>
            </div>
            <div class="d-flex">
              <v-text-field v-model="newEsdtValue.value" class="mr-1" label="Value" id="value">
              </v-text-field>
              <v-btn variant="plain" icon @click="step.tx.addEsdt(newEsdtValue)" height="56px"><v-icon
                  icon="mdi-plus"></v-icon></v-btn>
            </div>
            <v-list class="mb-2">
              <v-list-item class="px-1" v-for="esdt, i in step.tx.esdtValue" :title="esdt.tokenIdentifier"
                :subtitle="`${esdt.value}; ${esdt.nonce}`">
                <template v-slot:append>
                  <v-btn icon variant="plain" @click="step.tx.removeEsdt(i)"><v-icon icon="mdi-minus"></v-icon></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else-if="step.step === 'validatorReward'">
      <v-text-field class="mb-1" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-1" label="Value" id="value" v-model="step.tx.value"></v-text-field>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  step: Object
})
const newEsdtValue = ref({
  tokenIdentifier: "",
  nonce: "",
  value: ""
})

const newArgument = ref(null)

</script>