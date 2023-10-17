const FileUtility = require("../src/utils/FileUtility.js");

// Especifica la ruta de la carpeta donde se almacenarán los archivos
const folderPath = './archivos'; // Cambia esta ruta según tus necesidades

async function main() {
  const fileUtility = new FileUtility(folderPath);
  await fileUtility.initializeFolder();

  // Escribe en un archivo
  await fileUtility.writeToFile('example.txt', 'Hello, world!');


}

main().catch((error) => {
  console.error('An error occurred:', error);
});
