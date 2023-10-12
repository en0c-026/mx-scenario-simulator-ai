import { toRaw } from "vue"
const getDefaultState = (step) => {
  const defaultStates = {
    scCall: {
      from: "",
      to: "",
      function: "",
      egldValue: "",
      esdtValue: [],
      arguments: [],
      gasLimit: "",
      gasPrice: "",
      addArgument: function (argument) {
        this.arguments.push(argument)
      },
      removeArgument: function (index) {
        this.arguments = this.arguments.map(argument => toRaw(argument)).filter((_, i) => i !== index)
      },
      addEsdt: function (esdt) {
        this.esdtValue.push(esdt)
      },
      removeEsdt: function (index) {
        this.esdtValue = this.esdtValue.map(esdt => toRaw(esdt)).filter((_, i) => i !== index)
      }
    },
    scQuery: {
      from: "",
      to: "",
      function: "",
      arguments: [],
      addArgument: function (argument) {
        this.arguments.push(argument)
      },
      removeArgument: function (index) {
        this.arguments = this.arguments.map(argument => toRaw(argument)).filter((_, i) => i !== index)
      },
    },
    scDeploy: {
      from: "",
      contractCode: "",
      function: "",
      value: "",
      arguments: [],
      gasLimit: "",
      gasPrice: "",
      addArgument: function (argument) {
        this.arguments.push(argument)
      },
      removeArgument: function (index) {
        this.arguments = this.arguments.map(argument => toRaw(argument)).filter((_, i) => i !== index)
      },
    },
    transfer: {
      from: "",
      to: "",
      egldValue: "",
      esdtValue: [],
      addEsdt: function (esdt) {
        this.esdtValue.push(esdt)
      },
      removeEsdt: function (index) {
        this.esdtValue = this.esdtValue.map(esdt => toRaw(esdt)).filter((_, i) => i !== index)
      }
    },
    validatorReward: {
      to: "",
      value: ""
    },
  }
  return defaultStates[step]
}
export default class Transaction {

  constructor(type) {
    console.log(type, 'from class TRansaction');
    const defaultState = getDefaultState(type)
    if (defaultState) {
      for (const key in defaultState) {
        this[key] = defaultState[key]
      }
    } else {
      console.log('step stype dont default stae');
    }
  }
};
