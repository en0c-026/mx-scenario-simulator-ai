import { onMounted, ref, toRaw, watch } from 'vue'
import { Scenario, FileAPI, IDGenerator, FileModel } from '@/utils'
import { defineStore } from 'pinia'
const client = new FileAPI()
function processFiles(fileList) {
  const transformedFiles = [];
  for (const file of fileList) {
    const fileModel = new FileModel(file);
    transformedFiles.push(fileModel);

    if (file.is_folder && file.content.length > 0) {
      fileModel.content = processFiles(file.content);
    }
  }
  return transformedFiles;
}

const idGenerator = new IDGenerator();
const projectKey = "mx_scenario_sim_project_id"

const createProjectIfNotExists = async () => {
  let projectId = idGenerator.get(projectKey)
  if (projectId) {
    return projectId
  }
  projectId = idGenerator.generate();
  try {
    const projectExists = await client.checkId(projectId);

    if (projectExists) {
      console.log(`Project with ID ${projectId} already exists.`);
      return createProjectIfNotExists(); // Llamar recursivamente para generar un nuevo ID
    }

    // Si el proyecto no existe, créalo
    await client.createNewProject(projectId);
    console.log(`Project with ID ${projectId} created.`);
    return projectId;
  } catch (error) {
    console.error("Error checking project ID:", error);
    return null; // Manejo de errores
  }
};

export const useAppStore = defineStore('app', () => {
  const files = ref([])
  const error = ref(null)
  const loading = ref(true)
  const tempFile = ref(null)
  const rootPath = ref(null)
  const selectedPath = ref(null)
  const selectedFile = ref(null)

  onMounted(async () => {
    const projectId = await createProjectIfNotExists();
    if (projectId) {
      if (!idGenerator.get(projectKey)) {
        idGenerator.save(projectKey, projectId)
      }
      rootPath.value = `projects/${projectId}`
      selectedPath.value = `projects/${projectId}`
      const serverFiles = await client.getFiles(projectId)
      files.value = processFiles(serverFiles)
      console.log(files.value);
    } else {
      // Manejar el caso de error
    }
    console.log(files.value);
    loading.value = false

  })

  const selectPath = (path) => {
    selectedPath.value = path
  }
  const selectFile = (file) => {
    selectedFile.value = file
  }
  const refetchFiles = async () => {
    files.value = []
    const projectId = idGenerator.get(projectKey)
    const serverFiles = await client.getFiles(projectId)
    files.value = processFiles(serverFiles)
  }
  const addFile = (isFolder) => {
    tempFile.value = new FileModel(isFolder)
    files.value.push(tempFile)
  }

  const renameFile = async (filePath, newFilename) => {
    await client.renameFile(filePath, newFilename)
    await refetchFiles()
  }

  const removeFile = async (path, fileName) => {
    await client.deleteFile(path, fileName)
    await refetchFiles()
  }

  const newFolder = async () => {
    try {
      await client.createFolder(selectedPath.value, `new-folder-${files.value.length + 1}`)
      await refetchFiles()
    } catch (error) {

    }
  }

  const newFile = async (extension) => {
    console.log('arre', extension);
    try {
      const file = new FileModel({ name: `new-file-${files.value.length + 1}.${extension}`, is_folder: false, extension })
      await client.uploadFile(selectedPath.value, file)
      await refetchFiles()
    } catch (error) {

    }
  }
  const uploadFile = async (filePath, file) => {
    console.log(filePath, file);
    try {
      await client.uploadFile(filePath, file)
    } catch (error) {
    }
  }


  // -------------------------------------
  const selectedScenario = ref(undefined)
  const scenarios = ref([])

  const addScenario = async (name, content) => {
    try {
      const newFile = createFile(name, content)
      await client.uploadFile(newFile)
      const scenario = new Scenario({ name, ...content })
      scenarios.value.push(scenario)

    } catch (e) {
      error.value = "Has ocurred an error :("
    } finally {
      loading.value = false
    }
  }

  const editScenarioName = (index, newName) => {
    if (index >= 0 && index < scenarios.value.length) {
      scenarios.value[index].name = newName
    }
  }
  const resetScenarios = () => scenarios.value = []
  const deleteScenario = (index) => {
    scenarios.value = scenarios.value.map(v => toRaw(v)).filter((_, i) => i !== index)
  }
  const selectScenario = (index) => selectedScenario.value = scenarios.value[index]


  return {
    files,
    scenarios,
    newFolder,
    addFile,
    selectFile,
    selectedFile,
    loading,
    error,
    uploadFile,
    removeFile,
    selectPath,
    newFile,
    renameFile,
    //--------
    addScenario,
    editScenarioName,
    deleteScenario,
    selectScenario,
    selectedScenario,
    resetScenarios,
  }
})