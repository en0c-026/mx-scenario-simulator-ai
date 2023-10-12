import { Scenario } from '@utils'
import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'

export const useAppStore = defineStore('app', () => {
  const scenarios = ref([
    new Scenario('my-scenario.json'),
    new Scenario('my-scenario-2.json')

  ])

  const selectedScenario = ref(undefined)
  const addScenario = (name) => {
    const scenario = new Scenario(name)
    scenarios.value.push(scenario)
  }

  const editScenarioName = (index, newName) => {
    if (index >= 0 && index < scenarios.value.length) {
      scenarios.value[index].name = newName
    }
  }

  const deleteScenario = (index) => {
    scenarios.value = scenarios.value.map(v => toRaw(v)).filter((_, i) => i !== index)
  }
  const selectScenario = (index) => selectedScenario.value = scenarios.value[index]

  return {
    scenarios,
    addScenario,
    editScenarioName,
    deleteScenario,
    selectScenario,
    selectedScenario
  }
})