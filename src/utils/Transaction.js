import { toRaw } from "vue"
const getDefaultState = (type) => {
  return {
    scCall: (txObj) => {
      const initialState = {
        from: txObj?.from || "",
        to: txObj?.to || "",
        function: txObj?.function || "",
        egldValue: txObj?.egldValue || "",
        esdtValue: txObj?.esdtValue || [],
        arguments: txObj?.arguments?.map(argument => toRaw(argument)) || [],
        gasLimit: txObj?.gasLimit || "",
        gasPrice: txObj?.gasPrice || "",
        addArgument: function (argument) {
          this.arguments.push(argument);
        },
        removeArgument: function (index) {
          this.arguments = this.arguments.filter((_, i) => i !== index);
        },
        addEsdt: function (esdt) {
          this.esdtValue.push(esdt);
        },
        removeEsdt: function (index) {
          this.esdtValue = this.esdtValue.filter((_, i) => i !== index);
        }
      };

      return initialState;
    },
    scQuery: (txObj) => {
      const initialState = {
        from: txObj?.from || "",
        to: txObj?.to || "",
        function: txObj?.function || "",
        arguments: txObj?.arguments?.map(argument => toRaw(argument)) || [],
        addArgument: function (argument) {
          this.arguments.push(argument);
        },
        removeArgument: function (index) {
          this.arguments = this.arguments.filter((_, i) => i !== index);
        },
      };

      return initialState;
    },
    scDeploy: (txObj) => {
      const initialState = {
        from: txObj?.from || "",
        contractCode: txObj?.contractCode || "",
        function: txObj?.function || "",
        value: txObj?.value || "",
        arguments: txObj?.arguments?.map(argument => toRaw(argument)) || [],
        gasLimit: txObj?.gasLimit || "",
        gasPrice: txObj?.gasPrice || "",
        addArgument: function (argument) {
          this.arguments.push(argument);
        },
        removeArgument: function (index) {
          this.arguments = this.arguments.filter((_, i) => i !== index);
        },
      };

      return initialState;
    },
    transfer: (txObj) => {
      const initialState = {
        from: txObj?.from || "",
        to: txObj?.to || "",
        egldValue: txObj?.egldValue || "",
        esdtValue: txObj?.esdtValue || [],
        addEsdt: function (esdt) {
          this.esdtValue.push(esdt);
        },
        removeEsdt: function (index) {
          this.esdtValue = this.esdtValue.filter((_, i) => i !== index);
        },
      };

      return initialState;
    },
    validatorReward: (txObj) => {
      const initialState = {
        to: txObj?.to || "",
        value: txObj?.value || "",
      };

      return initialState;
    },
  };
};

export default class Transaction {
  constructor(type, txObj) {
    const defaultState = getDefaultState();
    const state = defaultState[type](txObj)
    for (const key in state) {
      this[key] = state[key];
    }
  }
};
