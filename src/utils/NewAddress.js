export default class NewAddress {
  constructor(address) {
    if (address) {
      this.creatorAddress = address.creatorAddress.startsWith('address:') ? address.creatorAddress : `address:${address.creatorAddress}`
      this.creatorNonce = address.creatorNonce
      this.newAddress = address.newAddress.startsWith('sc:') ? address.newAddress : `sc:${address.newAddress}`

    } else {
      this.creatorAddress = ""
      this.creatorNonce = ""
      this.newAddress = ""
    }
  }
};
