import { toRaw } from "vue"

export default class Log {

  constructor(log) {
    this.address = log?.address ?? ""
    this.endpoint = log?.endpoint ?? ""
    this.topics = log?.topics ?? []
    this.data = log?.data ?? ""
  }

  addTopic(topic) {
    this.topics.push(topic)
  }

  removeTopic(index) {
    this.topics = this.topics.map(topic => toRaw(topic)).filter((_, i) => i !== index)
  }

}
