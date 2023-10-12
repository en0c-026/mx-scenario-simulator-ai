import { toRaw } from "vue"

export default class Expect {
  constructor(type, value) {
    this.out = value?.out ?? []
    this.status = value?.status ?? ""
    this.gas = value?.gas ?? ""
    this.message = value?.message ?? ""
    this.refund = value?.refund ?? ""

    if (type === 'scCall' || type === 'scDeploy') {
      this.logs = value?.logs ?? []
      this.addLog = function (log) {
        this.logs.push(log)
      }

      this.removeLog = function (index) {
        this.logs = this.logs.map(log => toRaw(log)).filter((_, i) => i !== index)
      }
    }
  }

  addOut(out) {
    this.out.push(out)
  }

  removeOut(index) {
    this.out = this.out.map(out => toRaw(out)).filter((_, i) => i !== index)
  }


};
