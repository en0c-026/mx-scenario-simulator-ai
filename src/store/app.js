import { onMounted, onUnmounted, ref } from 'vue'
import { FileAPI, IDGenerator, FileModel } from '@/utils'
import { defineStore } from 'pinia'

const client = new FileAPI()
const idGenerator = new IDGenerator();
const projectKey = "mx_scenario_sim_project_id"

export const useAppStore = defineStore('app', () => {

  const files = ref([])
  const error = ref(null)
  const loading = ref(true)
  const editorCode = ref("")
  const currentTab = ref(0)
  const tempFile = ref(null)
  const rootPath = ref(null)
  const selectedPath = ref(null)
  const selectedFile = ref(null)
  const logs = ref([])

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
      client.setupEventListeners(addLog)
    } else {
    }
    loading.value = false

  })

  onUnmounted(() => {
    client.removeEventListeners()
  })

  const selectPath = (path) => {
    selectedPath.value = path
  }
  const selectFile = (file) => {
    selectedFile.value = file
    editorCode.value = typeof file.content !== 'string' ? JSON.stringify(file.content, null, 4) : file.content

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
  const newFolder = async (name, root) => {
    try {
      await client.createFolder(root ? rootPath.value : selectedPath.value, name ? name : `new-folder-${files.value.length + 1}`)
      await refetchFiles()
    } catch (error) {

    }
  }
  const newFile = async (extension, name, content) => {
    console.log('arre', extension);
    try {
      const file = new FileModel({
        name: name ? name : `new-file-${files.value.length + 1}.${extension}`,
        is_folder: false,
        extension,
        content: content
      })
      await client.uploadFile(selectedPath.value, file)
      await refetchFiles()
    } catch (error) {

    }
  }
  const uploadFile = async (filePath, file) => {
    try {
      if (typeof file.content !== 'string') {
        file.content = JSON.stringify(file.content, null, 4)
      }
      await client.uploadFile(filePath, file)
    } catch (error) {
    }
  }
  const executeCommand = async (command) => {
    await client.executeCommand(command, rootPath.value)
  }
  const addLog = (m) => {
    logs.value.push(m)
  }
  const clearLogs = () => logs.value = []

  return {
    files,
    newFolder,
    addFile,
    logs,
    editorCode,
    currentTab,
    clearLogs,
    selectFile,
    selectedFile,
    loading,
    error,
    uploadFile,
    removeFile,
    selectPath,
    newFile,
    renameFile,
    executeCommand
  }
})

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