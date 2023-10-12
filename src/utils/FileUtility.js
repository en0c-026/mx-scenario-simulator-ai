import fs from 'fs/promises'
import path from 'path'

export default class FileUtility {
  constructor(folderPath) {
    this.folderPath = folderPath;
  }

  async initializeFolder() {
    try {
      const stats = await fs.stat(this.folderPath);

      if (stats.isDirectory()) {
        console.log(`The folder "${this.folderPath}" already exists.`);
        return;
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(this.folderPath);
        console.log(`Created folder "${this.folderPath}".`);
      } else {
        console.error(`Error checking/creating folder "${this.folderPath}": ${error.message}`);
      }
    }
  }

  async writeToFile(fileName, content) {
    try {
      await fs.writeFile(path.join(this.folderPath, fileName), content, 'utf8');
      console.log(`Successfully wrote to ${fileName}`);
    } catch (error) {
      console.error(`Error writing to ${fileName}: ${error.message}`);
    }
  }

  async deleteFile(fileName) {
    try {
      await fs.unlink(path.join(this.folderPath, fileName));
      console.log(`Successfully deleted ${fileName}`);
    } catch (error) {
      console.error(`Error deleting ${fileName}: ${error.message}`);
    }
  }

  async editFile(fileName, newContent) {
    try {
      await fs.writeFile(path.join(this.folderPath, fileName), newContent, 'utf8');
      console.log(`Successfully edited ${fileName}`);
    } catch (error) {
      console.error(`Error editing ${fileName}: ${error.message}`);
    }
  }

  async readFilesInFolder() {
    try {
      const files = await fs.readdir(this.folderPath);

      console.log(`Files in "${this.folderPath}":`);
      files.forEach((file) => {
        console.log(file);
      });
    } catch (error) {
      console.error(`Error reading files in "${this.folderPath}": ${error.message}`);
    }
  }
}