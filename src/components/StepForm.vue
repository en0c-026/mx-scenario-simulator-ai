<template>
  <v-text-field v-if="step.step === 'externalStep'" label="Path" id="path" v-model="step.path"></v-text-field>
      <div v-else-if="step.step === 'setState'">
        <v-text-field class="mb-3" label="Comment" id="comment" v-model="step.comment"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Accounts">
            <template v-slot:text>
              <div class="d-flex mt-6">
                <v-select class="flex-0-0 mr-2" label="Type" v-model="newAccount.type" :items="accountTypes"></v-select>
                <v-text-field v-model="newAccount.address" class="mr-2" label="Account Address" id="account-address">
                </v-text-field>
                <v-btn variant="plain" icon @click="addAccount" color="warning"><v-icon icon="mdi-plus"></v-icon></v-btn>
              </div>
              <v-list class="mb-6">
                <v-list-item v-for="accountKey, i in Object.keys(step.accounts)" :key="i" :title="accountKey">
                  <template v-slot:append>
                    <v-dialog width="500">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="plain" icon size="x-small"> <v-icon
                            icon="mdi-pencil"></v-icon></v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card title="Edit Account" class="py-4" max-height="90vh">
                          <v-card-text>
                            <AccountForm v-if="step.accounts[accountKey]" :type="accountKey?.split(':')[0]"
                              :account="step.accounts[accountKey]" />
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                            <v-btn color="info" text="Save" @click="isActive.value = false"></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-btn variant="plain" icon size="x-small"> <v-icon icon="mdi-minus"
                        @click="removeAccount(accountKey)"></v-icon></v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
          <v-expansion-panel title="Addresses">
            <template v-slot:text>
              <div class="d-flex mt-6">
                <v-text-field v-model="newAddress.creatorAddress" class="mr-2 mb-3" label="Creator Address"
                  id="creator-address">
                </v-text-field>
                <v-text-field v-model="newAddress.creatorNonce" class="mb-3" label="Creator Nonce" id="creator-nonce">
                </v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field v-model="newAddress.newAddress" class="mr-2" label="New Address" id="new-address">
                </v-text-field>
                <v-btn variant="plain" icon @click="addNewAddress"
                  :disabled="!newAddress.newAddress || !newAddress.creatorAddress" color="warning"><v-icon
                    icon="mdi-plus"></v-icon></v-btn>
              </div>
              <v-list class="mb-6">
                <v-list-item v-for="address, i in step.newAddresses" :title="address.newAddress"
                  :subtitle="`${address.creatorAddress}; ${address.creatorNonce}`">
                  <template v-slot:append>
                    <v-icon size="small" @click="step.removeNewAddress(i)" icon="mdi-minus"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
          <v-expansion-panel title="Previous Block">
            <template v-slot:text>
              <v-text-field class="mb-2 mt-4" label="Timestamp" id="previous-block-timestamp"
                v-model="step.previousBlockInfo.blockTimestamp"></v-text-field>
              <v-text-field class="mb-2" label="Nonce" id="previous-block-nonce"
                v-model="step.previousBlockInfo.blockNonce"></v-text-field>
              <v-text-field class="mb-2" label="Round" id="previous-block-round"
                v-model="step.previousBlockInfo.blockRound"></v-text-field>
              <v-text-field class="mb-6" label="Epoch" id="previous-block-epoch"
                v-model="step.previousBlockInfo.blockEpoch"></v-text-field>
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
          <v-expansion-panel title="Current Block">
            <template v-slot:text>
              <v-text-field class="mb-2 mt-4" label="Timestamp" id="current-block-timestamp"
                v-model="step.currentBlockInfo.blockTimestamp"></v-text-field>
              <v-text-field class="mb-2" label="Nonce" id="current-block-nonce"
                v-model="step.currentBlockInfo.blockNonce"></v-text-field>
              <v-text-field class="mb-2" label="Round" id="current-block-round"
                v-model="step.currentBlockInfo.blockRound"></v-text-field>
              <v-text-field class="mb-6" label="Epoch" id="current-block-epoch"
                v-model="step.currentBlockInfo.blockEpoch"></v-text-field>
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else-if="step.step === 'checkState'">
        <v-text-field class="mb-3" label="Comment" id="comment" v-model="step.comment"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Accounts">
            <template v-slot:text>
              <div class="d-flex">
                <v-select class="flex-0-0 mr-2" label="Type" v-model="newAccount.type" :items="accountTypes"></v-select>
                <v-text-field v-model="newAccount.address" class="mr-2" label="Account Address" id="account-address">
                </v-text-field>
                <v-btn variant="plain" icon @click="addAccount"><v-icon icon="mdi-plus"></v-icon></v-btn>
              </div>
              <v-list class="mb-2">
                <v-list-item v-for="accountKey, i in Object.keys(step.accounts)" :key="i" class="px-1" :title="accountKey">
                  <template v-slot:append>
                    <v-dialog width="500">
                      <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" variant="plain" icon size="x-small"> <v-icon
                            icon="mdi-pencil"></v-icon></v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card class="pa-4" max-height="90vh">
                          <v-card-text>
                            <AccountForm :type="accountKey.split(':')[0]" :account="step.accounts[accountKey]" />
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                            <v-btn color="info" text="Save" @click="isActive.value = false"></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-btn variant="plain" icon size="x-small"> <v-icon icon="mdi-minus"
                        @click="removeAccount(accountKey)"></v-icon></v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else-if="step.step === 'dumpState'">
        <v-text-field class="mb-3" label="Comment" id="comment" v-model="step.comment"></v-text-field>
      </div>
      <div v-else-if="step.step === 'scCall'">
        <v-text-field v-model="step.comment" class="mr-2 mb-3" label="Comment" id="comment"></v-text-field>
        <v-text-field v-model="step.txId" class="mr-2 mb-3" label="Transaction Id" id="tx-id"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Transaction">
            <template v-slot:text>
              <TransactionForm :step="step" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
          <v-expansion-panel title="Expect">
            <template v-slot:text>
              <ExpectForm :type="step.step" :expect="step.expect" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else-if="step.step === 'scQuery'">
        <v-text-field v-model="step.comment" class="mr-2 mb-3" label="Comment" id="comment"></v-text-field>
        <v-text-field v-model="step.txId" class="mr-2 mb-3" label="Transaction Id" id="tx-id"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Transaction">
            <template v-slot:text>
              <TransactionForm :step="step" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
          <v-expansion-panel title="Expect">
            <template v-slot:text>
              <ExpectForm :type="step.step" :expect="step.expect" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else-if="step.step === 'scDeploy'">
        <v-text-field v-model="step.comment" class="mr-2 mb-3" label="Comment" id="comment"></v-text-field>
        <v-text-field v-model="step.txId" class="mr-2 mb-3" label="Transaction Id" id="tx-id"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Transaction">
            <template v-slot:text>
              <TransactionForm :step="step" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
          <v-expansion-panel title="Expect">
            <template v-slot:text>
              <ExpectForm :type="step.step" :expect="step.expect" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else-if="step.step === 'transfer'">
        <v-text-field v-model="step.comment" class="mr-2 mb-3" label="Comment" id="comment"></v-text-field>
        <v-text-field v-model="step.txId" class="mr-2 mb-3" label="Transaction Id" id="tx-id"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Transaction">
            <template v-slot:text>
              <TransactionForm :step="step" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else-if="step.step === 'validatorReward'">
        <v-text-field v-model="step.comment" class="mr-2 mb-3" label="Comment" id="comment"></v-text-field>
        <v-text-field v-model="step.txId" class="mr-2 mb-3" label="Transaction Id" id="tx-id"></v-text-field>
        <v-expansion-panels>
          <v-expansion-panel title="Transaction">
            <template v-slot:text>
              <TransactionForm :step="step" />
              <v-divider></v-divider>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
</template>

<script setup>
import { ref } from 'vue';
import { Account, NewAddress } from '@utils'
import { AccountForm, TransactionForm, ExpectForm } from '@components'

const props = defineProps({
  step: Object
})

const newAccount = ref({
  type: 'address',
  address: null
})

const newAddress = ref({
  creatorAddress: "",
  creatorNonce: "",
  newAddress: ""
})

const accountTypes = [
  {
    title: "Address",
    value: "address"
  },
  {
    title: "Contract",
    value: "sc"
  }
]
const addAccount = () => {
  if (!newAccount.value.type || !newAccount.value.address) {
    return
  }
  props.step.addAccount(
    `${newAccount.value.type}:${newAccount.value.address}`,
    new Account(newAccount.value.type)
  )
  newAccount.value.address = null
}
const addNewAddress = () => {
  console.log('from addNewAddress', new NewAddress(newAddress.value));
  props.step.addNewAddress(new NewAddress(newAddress.value))
  newAddress.value = {
    creatorAddress: "",
    creatorNonce: "",
    newAddress: ""
  }
}

const removeAccount = (key) => {
  props.step.removeAccount(key)
}
</script>