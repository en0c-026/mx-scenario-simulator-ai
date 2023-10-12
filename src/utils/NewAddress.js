export default class NewAddress {
  constructor(address) {
    this.creatorAddress = `address:${address.creatorAddress}`
    this.creatorNonce = address.creatorNonce
    this.newAddress = `sc:${address.newAddress}`
  }
};
