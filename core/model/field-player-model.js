"use strict";


class FieldPlayerModel {
  constructor(opts) {
    if (!opts) throw new Error('No arguments was specified');

    this.id = opts.id;
    this.coords = opts.coords || {x: 0, y: 0};
  }
}

module.exports = FieldPlayerModel;
