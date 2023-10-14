
const getDefaultState = (type) => {
  const defaultStates = {
    file: {
      name: "",
      content: "",
      editing: false,
      extension: "",
      path: "",
      toggleEditing: function () {
        this.editing = !this.editing
      }
    },
    folder: {
      name: "",
      content: [],
      is_folder: true,
      open: false,
      editing: false,
      path: "",
      toggleFolder: function () {
        this.open = !this.open
      },
      toggleEditing: function () {
        this.editing = !this.editing
      }
    }
  }
  return defaultStates[type]
}

export default class FileModel {

  constructor(file) {
    
    const defaultState = getDefaultState(file?.is_folder ? 'folder' : 'file')
    if (defaultState) {
      for (const key in defaultState) {
        this[key] = file[key] ? file[key] : defaultState[key]
      }
    } else {
      console.log('file type dont default state');
    }
  }


}