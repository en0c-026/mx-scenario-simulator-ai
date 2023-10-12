import { toRaw } from "vue"
import Transaction from "./Transaction"
import Expect from "./Expect"

const getDefaultState = (step) => {
  const defaultStates = {
    externalStep: {
      path: "",
    },
    setState: {
      comment: "",
      accounts: {},
      newAddresses: [],
      previousBlockInfo: {
        blockTimestamp: "",
        blockNonce: "",
        blockRound: "",
        blockEpoch: ""
      },
      currentBlockInfo: {
        blockTimestamp: "",
        blockNonce: "",
        blockRound: "",
        blockEpoch: ""
      },
      addAccount: function (key, value) {
        this.accounts[key] = value
      },
      removeAccount: function (key) {
        delete this.accounts[key]
      },
      addNewAddress: function (value) {
        this.newAddresses.push(value)
      },
      removeNewAddress: function (index) {
        const filteredNewAddresses = this.newAddresses
          .map((newAddress) => toRaw(newAddress))
          .filter((_, i) => i !== index)
        this.newAddresses = filteredNewAddresses
      },
    },
    checkState: {
      comment: "",
      accounts: {},
      addAccount: function (key, value) {
        this.accounts[key] = value
      },
      removeAccount: function (key) {
        delete this.accounts[key]
      },
    },
    dumpState: {
      comment: "",
    },
    scCall: {
      txId: "",
      comment: "",
      tx: new Transaction('scCall'),
      expect: new Expect('scCall')
    },
    scQuery: {
      txId: "",
      comment: "",
      tx: new Transaction('scQuery'),
      expect: new Expect('scQuery')
    },
    scDeploy: {
      txId: "",
      comment: "",
      tx: new Transaction('scDeploy'),
      expect: new Expect('scDeploy')
    },
    transfer: {
      txId: "",
      comment: "",
      tx: new Transaction('transfer'),

    },
    validatorReward: {
      txId: "",
      comment: "",
      tx: new Transaction('validatorReward'),
    },
  }
  return defaultStates[step]
}

export default class Step {

  constructor(type) {
    this.step = type;
    const defaultState = getDefaultState(type)
    if (defaultState) {
      for (const key in defaultState) {
        this[key] = defaultState[key]
      }
    } else {
      console.log('step stype dont default stae');
    }
  }


}