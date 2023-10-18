import { onMounted, onUnmounted, ref } from 'vue'
import { FileAPI, IDGenerator, FileModel } from '@/utils'
import { defineStore } from 'pinia'
const serverUrl = "http://54.85.162.223/api/"
const client = new FileAPI(serverUrl)
const idGenerator = new IDGenerator();
const projectKey = "mx_scenario_sim_project_id"

export const useAppStore = defineStore('app', () => {
  const showSidenav = ref(false)
  const files = ref([])
  const error = ref(null)
  const loading = ref(true)
  const editorCode = ref("")
  const latestProjects = ref([])
  const currentTab = ref(1)
  const tempFile = ref(null)
  const rootPath = ref(null)
  const projectPath = ref(null)
  const selectedPath = ref(null)
  const selectedFile = ref(null)
  const logs = ref([])
  const refechLoading = ref(false)


  onMounted(async () => {

    let projectId = idGenerator.get(projectKey)
    if (!projectId) {
      projectId = await createProject()
    }
    rootPath.value = `projects/${projectId}`
    client.setupEventListeners(addLog)
    const serverFiles = await client.getFiles(projectId)
    latestProjects.value = serverFiles.filter((file) => file.is_folder).map(file => file.name)
    loading.value = false

  })

  onUnmounted(() => {
    client.removeEventListeners()
  })

  const selectProjectPath = (path) => {
    projectPath.value = path
    selectedPath.value = `${rootPath.value}/${path}`
    refetchFiles(path)
  }

  const selectPath = (path) => {
    selectedPath.value = path
  }
  const selectFile = (file) => {
    selectedFile.value = file
    editorCode.value = typeof file.content !== 'string' ? JSON.stringify(file.content, null, 4) : file.content

  }
  const refetchFiles = async (folderPath, timeout) => {
    console.log('from refetchFiles', folderPath);
    refechLoading.value = true
    files.value = []
    const projectId = idGenerator.get(projectKey)
    let serverFiles
    if (timeout) {
      await new Promise(r => setTimeout(r, timeout))
      serverFiles = await client.getFiles(projectId, folderPath)
    } else {
      serverFiles = await client.getFiles(projectId, folderPath)
    }
    files.value = processFiles(serverFiles)
    refechLoading.value = false
  }
  const addFile = (isFolder) => {
    tempFile.value = new FileModel(isFolder)
    files.value.push(tempFile)
  }
  const renameFile = async (filePath, newFilename) => {
    await client.renameFile(filePath, newFilename)
    await refetchFiles(projectPath.value)
  }
  const removeFile = async (path, fileName) => {
    await client.deleteFile(path, fileName)
    await refetchFiles(projectPath.value)
  }
  const newFolder = async (name, root) => {
    try {
      await client.createFolder(root ? `${rootPath.value}/${projectPath.value}` : selectedPath.value, name ? name : `new-folder-${files.value.length + 1}`)
      await refetchFiles(projectPath.value)
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
      await refetchFiles(projectPath.value)
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

  const downloadProject = async () => {
    await client.downloadFolder(`${rootPath.value}/${projectPath.value}`)
  }

  const executeCommand = async (command, path) => {
    await client.executeCommand(command, path ? `${rootPath.value}/${path}` : rootPath.value)
  }
  const addLog = (m) => {
    logs.value.push(m)
    const projectCreatedRegex = /Project created/

    if (m.startsWith("CRITICAL")) {
      loading.value = false
      refechLoading.value = false
      error.value = m
      return
    } else if (m.startsWith("requests.exceptions.ConnectionError:")) {
      loading.value = false
      refechLoading.value = false
      error.value = 'Connection Error. Please try again later.'
    }

    if (projectCreatedRegex.test(m)) {
      refetchFiles(projectPath.value, 2000)
    }
  }
  const clearLogs = () => logs.value = []

  return {
    showSidenav,
    files,
    latestProjects,
    newFolder,
    addFile,
    logs,
    editorCode,
    refechLoading,
    projectPath,
    currentTab,
    selectProjectPath,
    downloadProject,
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



const createProject = async () => {
  const projectId = idGenerator.generate();
  try {
    const projectExists = await client.checkId(projectId);

    if (projectExists) {
      console.log(`Project with ID ${projectId} already exists.`);
      return createProject();
    }

    await client.createNewProject(projectId);
    console.log(`Project with ID ${projectId} created.`);
    idGenerator.save(projectKey, projectId)
    return projectId;
  } catch (error) {
    console.error("Error checking project ID:", error);
    return null;
  }
};