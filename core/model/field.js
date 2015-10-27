"use strict";
class Field {
  constructor(opts) {
    opts = opts || {};

    this.width = opts.width || 600;
    this.height = opts.height || 400;
    this.playerWidth = opts.playerWidth || 200;
  }
}
module.exports = Field;
