export default class Account {
  constructor(type) {
    if (type === 'address') {
      this.comment = ""
      this.nonce = ""
      this.balance = ""
      this.esdt = {}
      this.username = ""
      this.storage = {}
      this.code = ""
    } else if (type === 'sc') {
      this.nonce = ""
      this.balance = ""
      this.esdt = {}
      this.storage = {}
      this.code = ""
    }
    
  }

  addEsdt(key, value) {
    console.log('from addEsdt', key, value);

    this.esdt[`str:${key}`] = value
  } 
  removeEsdt(key) {
    delete this.esdt[key]
  }
  addStorageEntry(key, value) {
    console.log('from addStorage', key ,value);
    this.storage[`str:${key}`] = value
  }
  removeStorageEntry(key) {
    delete this.storage[key]
  }
}