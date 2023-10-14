export default class IDGenerator {
  constructor(prefix = '', length = 6) {
    this.prefix = prefix;
    this.length = length;
  }

  generate() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = this.prefix;

    while (id.length < this.length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  }

  save(idKey, value) {
    if (!idKey) {
      console.error('Missing id key');
      return;
    }

    localStorage.setItem(idKey, value);
  }

  get(idKey) {
    if (!idKey) {
      console.error('Missing id key');
      return null;
    }

    const storedID = localStorage.getItem(idKey);
    return storedID;
  }
}