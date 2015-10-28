"use strict"
let util = require('util');
let EventEmitter = require('events').EventEmitter;
let _ = require('underscore');
let FieldSide = require('./field-side.js');


class Field {
  constructor(opts) {
    opts = opts || {};
    this.sides = [];

    if (util.isArray(opts.fieldSideModels)) {
      opts.fieldSideModels.forEach((sModel, index) => {
        let $sideEl =
          util.isArray(opts.fieldSideElements) &&
          typeof opts.fieldSideElements[index] != 'undefined' ? 
          opts.fieldSideElements[index] :
          null;
        this.addFieldSide(new FieldSide({model: sModel, $el: $sideEl}));
      })
    }
  }

  addFieldSide(fieldSide) {
    fieldSide.on('playerMove',
        e => {
          this.emit('playerMove', _.extend(e, {fieldSide: fieldSide}));
        });
    this.sides.push(fieldSide);
  }

  movePlayer(info) {
    let side = this.fieldSide(info.fieldSide.id);
    //TODO: check for existance
    side.movePlayer(info.player);
  }

  fieldSide(id) {
    return _.findWhere(this.sides, {id: id});
  }
}
Field.prototype.__proto__ = EventEmitter.prototype;

module.exports = Field;
