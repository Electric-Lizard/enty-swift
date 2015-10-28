"use strict"
let util = require('util');
let EventEmitter = require('events').EventEmitter;
let _ = require('underscore');
let FieldZone = require('./field-zone.js');


class Field {
  constructor(opts) {
    opts = opts || {};
    this.sides = [];

    if (util.isArray(opts.fieldZoneModels)) {
      opts.fieldZoneModels.forEach((sModel, index) => {
        let $sideEl =
          util.isArray(opts.fieldZoneElements) &&
          typeof opts.fieldZoneElements[index] != 'undefined' ? 
          opts.fieldZoneElements[index] :
          null;
        this.addFieldZone(new FieldZone({model: sModel, $el: $sideEl}));
      })
    }
  }

  addFieldZone(fieldZone) {
    fieldZone.on('playerMove',
        e => {
          this.emit('playerMove', _.extend(e, {fieldZone: fieldZone}));
        });
    this.sides.push(fieldZone);
  }

  movePlayer(info) {
    let side = this.fieldZone(info.fieldZone.id);
    //TODO: check for existance
    side.movePlayer(info.player);
  }

  fieldZone(id) {
    return _.findWhere(this.sides, {id: id});
  }
}
Field.prototype.__proto__ = EventEmitter.prototype;

module.exports = Field;
