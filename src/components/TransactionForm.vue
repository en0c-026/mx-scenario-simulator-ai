<template>
  <div class="pt-4 pb-8">
    <div v-if="step.step === 'scCall'">
      <v-text-field class="mb-3" label="From" id="from" v-model="step.tx.from"></v-text-field>
      <v-text-field class="mb-3" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-3" label="Egld Value" id="egld-value" v-model="step.tx.egldValue"></v-text-field>
      <v-text-field class="mb-3" label="Function" id="function" v-model="step.tx.function"></v-text-field>
      <v-text-field class="mb-3" label="Gas Limit" id="gas-limit" v-model="step.tx.gasLimit"></v-text-field>
      <v-text-field class="mb-3" label="Gas Price" id="gas-price" v-model="step.tx.gasPrice"></v-text-field>
      <v-list-item title="ESDT Value" class="px-2 mb-1">
        <template v-slot:append>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="ESDT Value" class="py-2">
                <template v-slot:text>
                  <div class="d-flex mt-4">
                    <v-text-field v-model="newEsdtValue.tokenIdentifier" class="mr-2 mb-3" label="Token Identifier"
                      id="token-identifier"> </v-text-field>
                    <v-text-field v-model="newEsdtValue.nonce" class="mb-3" label="Nonce" id="nonce"> </v-text-field>
                  </div>
                  <div class="d-flex">
                    <v-text-field class="mr-1" v-model="newEsdtValue.value" label="Value" id="value"> </v-text-field>
                    <v-btn variant="plain" @click="addEsdt" icon color="warning"><v-icon icon="mdi-plus"></v-icon></v-btn>
                  </div>
                  <v-list class="mb-2">
                    <v-list-item class="px-1" v-for="esdt, i in step.tx.esdtValue" :title="esdt.tokenIdentifier"
                      :subtitle="`${esdt.value}; ${esdt.nonce}`">
                      <template v-slot:append>
                        <v-icon size="x-small" @click="step.tx.removeEsdt(i)" icon="mdi-minus"></v-icon>
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
      <v-list-item title="Arguments" class="px-2 mb-4">
        <template v-slot:append>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="Arguments" class="py-2">
                <template v-slot:text>
                  <div class="d-flex mt-4">
                    <v-text-field v-model="newArgument" class="mr-1" label="Argument" id="argument">
                    </v-text-field>
                    <v-btn variant="plain" icon @click="() => {
                      step.tx.addArgument(newArgument)
                      newArgument = null
                    }"><v-icon icon="mdi-plus"></v-icon></v-btn>
                  </div>
                  <v-list class="mb-2">
                    <v-list-item v-for="argument, i in step.tx.arguments" :title="argument">
                      <template v-slot:append>
                        <v-icon size="x-small" @click="step.tx.removeArgument(i)" icon="mdi-minus"></v-icon>
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
    </div>
    <div v-else-if="step.step === 'scQuery'">
      <v-text-field class="mb-3" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-3" label="Function" id="function" v-model="step.tx.function"></v-text-field>
      <v-list-item title="Arguments" class="px-2 mb-4">
        <template v-slot:append>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="Arguments" class="py-2">
                <template v-slot:text>
                  <div class="d-flex mt-4">
                    <v-text-field v-model="newArgument" class="mr-1" label="Argument" id="argument">
                    </v-text-field>
                    <v-btn variant="plain" icon @click="() => {
                      step.tx.addArgument(newArgument)
                      newArgument = null
                    }"><v-icon icon="mdi-plus"></v-icon></v-btn>
                  </div>
                  <v-list class="mb-2">
                    <v-list-item v-for="argument, i in step.tx.arguments" :title="argument">
                      <template v-slot:append>
                        <v-icon size="x-small" @click="step.tx.removeArgument(i)" icon="mdi-minus"></v-icon>
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
    </div>
    <div v-else-if="step.step === 'scDeploy'">
      <v-text-field class="mb-3 mt-4" label="From" id="from" v-model="step.tx.from"></v-text-field>
      <v-text-field class="mb-3" label="Contract Code" id="contract-code" v-model="step.tx.contractCode"></v-text-field>
      <v-text-field class="mb-3" label="Value" id="value" v-model="step.tx.value"></v-text-field>
      <v-text-field class="mb-3" label="Function" id="function" v-model="step.tx.function"></v-text-field>
      <v-text-field class="mb-3" label="Gas Limit" id="gas-limit" v-model="step.tx.gasLimit"></v-text-field>
      <v-text-field class="mb-3" label="Gas Price" id="gas-price" v-model="step.tx.gasPrice"></v-text-field>
      <v-list-item title="Arguments" class="px-2 mb-4">
        <template v-slot:append>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="Arguments" class="py-2">
                <template v-slot:text>
                  <div class="d-flex mt-4">
                    <v-text-field v-model="newArgument" class="mr-1" label="Argument" id="argument">
                    </v-text-field>
                    <v-btn variant="plain" icon @click="() => {
                      step.tx.addArgument(newArgument)
                      newArgument = null
                    }"><v-icon icon="mdi-plus"></v-icon></v-btn>
                  </div>
                  <v-list class="mb-2">
                    <v-list-item v-for="argument, i in step.tx.arguments" :title="argument">
                      <template v-slot:append>
                        <v-icon size="x-small" @click="step.tx.removeArgument(i)" icon="mdi-minus"></v-icon>
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
    </div>
    <div v-else-if="step.step === 'transfer'">
      <v-text-field class="mb-3 mt-4" label="From" id="from" v-model="step.tx.from"></v-text-field>
      <v-text-field class="mb-3" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-4" label="Egld Value" id="egld-value" v-model="step.tx.egldValue"></v-text-field>
      <v-list-item title="ESDT Value" class="px-2 mb-4">
        <template v-slot:append>
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" size="x-small" icon="mdi-pencil"></v-icon>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="ESDT Value" class="py-2">
                <template v-slot:text>
                  <div class="d-flex mt-4">
                    <v-text-field v-model="newEsdtValue.tokenIdentifier" class="mr-2 mb-3" label="Token Identifier"
                      id="token-identifier"> </v-text-field>
                    <v-text-field v-model="newEsdtValue.nonce" class="mb-3" label="Nonce" id="nonce"> </v-text-field>
                  </div>
                  <div class="d-flex">
                    <v-text-field class="mr-1" v-model="newEsdtValue.value" label="Value" id="value"> </v-text-field>
                    <v-btn variant="plain" @click="addEsdt" icon color="warning"><v-icon icon="mdi-plus"></v-icon></v-btn>
                  </div>
                  <v-list class="mb-2">
                    <v-list-item class="px-1" v-for="esdt, i in step.tx.esdtValue" :title="esdt.tokenIdentifier"
                      :subtitle="`${esdt.value}; ${esdt.nonce}`">
                      <template v-slot:append>
                        <v-icon size="x-small" @click="step.tx.removeEsdt(i)" icon="mdi-minus"></v-icon>
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
    </div>
    <div v-else-if="step.step === 'validatorReward'">
      <v-text-field class="mb-3 mt-4" label="To" id="to" v-model="step.tx.to"></v-text-field>
      <v-text-field class="mb-4" label="Value" id="value" v-model="step.tx.value"></v-text-field>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  step: Object
})
const newEsdtValue = ref({
  tokenIdentifier: "str:",
  nonce: "",
  value: ""
})
const addEsdt = () => {
  props.step.tx.addEsdt(newEsdtValue.value)
  newEsdtValue.value = {
    tokenIdentifier: "str:",
    nonce: "",
    value: ""
  }
}
const newArgument = ref(null)
const handleUpdateTokenId = (v) => v.startsWith('str:') ? newEsdtValue.value.tokenIdentifier = v : newEsdtValue.value.tokenIdentifier = `str:${v}`
</script>