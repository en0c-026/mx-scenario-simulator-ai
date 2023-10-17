import { toRaw } from "vue"
import {
  Transaction,
  Expect,
  NewAddress,
  BlockInfo,
  Account
} from "@/utils"

const getDefaultState = () => {
  return {
    externalStep: (step) => ({
      path: step?.path ?? "",
    }),
    setState: (step) => {
      const initialState = {
        comment: step?.comment ?? "",
        accounts: {},
        newAddresses: step?.newAddresses?.map((newAddress) => new NewAddress(newAddress)) ?? [],
        previousBlockInfo: new BlockInfo(step?.previousBlockInfo),
        currentBlockInfo: new BlockInfo(step?.currentBlockInfo),
        addAccount: function (key, value) {
          this.accounts[key] = value;
        },
        removeAccount: function (key) {
          delete this.accounts[key];
        },
        addNewAddress: function (value) {
          this.newAddresses.push(value);
        },
        removeNewAddress: function (index) {
          const filteredNewAddresses = this.newAddresses
            .map((newAddress) => toRaw(newAddress))
            .filter((_, i) => i !== index);
          this.newAddresses = filteredNewAddresses;
        },
      };

      if (step) {
        for (const key in step.accounts) {
          const accountData = step.accounts[key];
          const type = key.split(":")[0]; // Obtiene el tipo de cuenta ("address" o "sc")
          const accountInstance = new Account(type);

          for (const prop in accountData) {
            if (prop === "esdt") {
              for (const subKey in accountData[prop]) {
                accountInstance.addEsdt(subKey, accountData[prop][subKey]);
              }
            } else if (prop === "storage") {
              for (const subKey in accountData[prop]) {
                accountInstance.addStorageEntry(subKey, accountData[prop][subKey]);
              }
            } else {
              accountInstance[prop] = accountData[prop];
            }
          }

          initialState.addAccount(key, accountInstance);
        }
      }

      return initialState;
    },
    checkState: (step) => {
      const initialState = {
        comment: step?.comment ?? "",
        accounts: {},
        addAccount: function (key, value) {
          this.accounts[key] = value
        },
        removeAccount: function (key) {
          delete this.accounts[key]
        }
      }
      if (step) {
        for (const key in step.accounts) {
          const accountData = step.accounts[key];
          const type = key.split(":")[0]; // Obtiene el tipo de cuenta ("address" o "sc")
          const accountInstance = new Account(type);

          for (const prop in accountData) {
            if (prop === "esdt") {
              for (const subKey in accountData[prop]) {
                accountInstance.addEsdt(subKey, accountData[prop][subKey]);
              }
            } else if (prop === "storage") {
              for (const subKey in accountData[prop]) {
                accountInstance.addStorageEntry(subKey, accountData[prop][subKey]);
              }
            } else {
              accountInstance[prop] = accountData[prop];
            }
          }

          initialState.addAccount(key, accountInstance);
        }
      }
      return initialState;

    },
    dumpState: (step) => ({
      comment: step?.comment ?? "",
    }),
    scCall: (step) => ({
      txId: step?.txId ?? "",
      comment: step?.comment ?? "",
      tx: new Transaction('scCall', step?.tx),
      expect: new Expect('scCall', step?.expect)
    }),
    scQuery: (step) => ({
      txId: step?.txId ?? "",
      comment: step?.comment ?? "",
      tx: new Transaction('scQuery', step?.tx),
      expect: new Expect('scQuery', step?.expect)
    }),
    scDeploy: (step) => ({
      txId: step?.txId ?? "",
      comment: step?.comment ?? "",
      tx: new Transaction('scDeploy', step?.tx),
      expect: new Expect('scDeploy', step?.expect)
    }),
    transfer: (step) => ({
      txId: step?.txId ?? "",
      comment: step?.comment ?? "",
      tx: new Transaction('transfer', step?.tx),

    }),
    validatorReward: (step) => ({
      txId: step?.txId ?? "",
      comment: step?.comment ?? "",
      tx: new Transaction('validatorReward', step?.tx),
    }),
  }
}

export default class Step {
  constructor(type, stepObj) {
    this.step = type;
    const defaultState = getDefaultState();
    const stateFn = defaultState[type]
    const state = stateFn(stepObj)
    for (const key in state) {
      this[key] = state[key];
    }
  }
}