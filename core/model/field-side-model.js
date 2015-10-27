"use strict";


class FieldSideModel {
  constructor(opts) {
    if (!opts) throw Error('No arguments was specified');

    this.id = opts.id;
    this.players = opts.players;
  }
}

module.exports = FieldSideModel;
