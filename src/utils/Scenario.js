import { toRaw } from "vue";
import Step from "./Step";

export default class Scenario {

  constructor(scenario) {
    this.name = scenario.name ?? "";
    this.steps = scenario.steps ?? [];
  }

  addStep(type) {
    const step = new Step(type)
    this.steps.push(step)
  }

  removeStep(index) {
    this.steps = this.steps.map(step => toRaw(step)).filter((_, i) => i !== index)

  }
}