import { toRaw } from "vue";
import Step from "./Step";

export default class Scenario {

  constructor(name) {
    this.name = name;
    this.steps = [];
  }

  addStep(type) {
    const step = new Step(type)
    this.steps.push(step)
  }

  removeStep(index) {
    this.steps = this.steps.map(step => toRaw(step)).filter((_, i) => i !== index)

  }
}