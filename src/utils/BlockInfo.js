export default class BlockInfo {
  constructor(block) {
    this.blockTimestamp = block ? block.blockTimestamp : ""
    this.blockNonce = block ? block.blockNonce : ""
    this.blockRound = block ? block.blockRound : ""
    this.blockEpoch = block ? block.blockEpoch : ""
  }
};
