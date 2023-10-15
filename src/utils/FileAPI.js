// FileAPI.js
import axios from "axios";
    import io from 'socket.io-client';


const getMimeType = (extension) => {
  const mimeTypes = {
    json: 'application/json',
    txt: 'text/plain',
    md: 'text/markdown',
    rs: 'text/x-rust',
    py: 'text/x-python',
    toml: 'application/toml',
    wasm: 'application/wasm'
  };

  return mimeTypes[extension] || 'application/octet-stream'; // Por defecto, utiliza un tipo MIME genérico si no se encuentra uno específico.
};
const createFile = (filename, data, extension) => {
  const blob = new Blob([data], { type: getMimeType(extension) });
  return new File([blob], filename);
}
export default class FileAPI {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl || 'http://localhost:5000';
    this.socket = io(this.BASE_URL);
  }

  async uploadFile(filePath, file) {
    try {
      const fileBlob = createFile(file.name, file.content, file.extension)
      const formData = new FormData();
      formData.append('file', fileBlob);

      const response = await axios.post(`${this.BASE_URL}/handle-file/${filePath}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async renameFile(filePath, newFilename) {
    try {
      const formData = new FormData();
      formData.append('new_filename', newFilename);

      const response = await axios.put(`${this.BASE_URL}/handle-file/${filePath}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getFiles(projectId, folderId) {
    try {
      const filePath = folderId ? `${projectId}/$${folderId}` : projectId
      const response = await axios.get(`${this.BASE_URL}/files/${filePath}`);
      return response.data.files;
    } catch (error) {
      throw error;
    }
  }

  async getFileContent(projectId, folderId, filename) {
    try {
      const response = await axios.get(`${this.BASE_URL}/files/${projectId}/${folderId}/${filename}`);
      return response.data.content;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(path, fileName) {
    console.log('path', path);
    try {
      const filePath = `${path}/${fileName}`
      const response = await axios.delete(`${this.BASE_URL}/handle-file/${filePath}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async checkId(projectId) {
    try {
      const response = await axios.get(`${this.BASE_URL}/checkId/${projectId}`);
      return response.data.exists;
    } catch (error) {
      throw error;
    }
  }

  async createNewProject(projectId) {
    try {
      const response = await axios.get(`${this.BASE_URL}/newId/${projectId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createFolder(folderPath, name) {
    try {
      const response = await axios.post(`${this.BASE_URL}/create-folder/${folderPath}/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteFolder(projectId, folderId) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/delete-folder/${projectId}/${folderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async executeCommand(command, folderPath) {
    try {
      this.socket.emit('execute_command', { command, folderPath });
    } catch (error) {
      throw error;
    }
  }
  setupEventListeners(cb) {
    this.socket.on('console_output', cb ?? this.log);
  }
  log(msg) {
    console.log(msg);
  }
}
