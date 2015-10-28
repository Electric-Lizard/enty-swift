"use strict"
var util = require('util');
var EventEmitter = require('events').EventEmitter;
let _ = require('underscore');


class FieldPlayer {
  constructor(opts) {
    opts = opts || {};

    this.model = opts.model;
    this.id = this.model.id;
    this.coordShift = opts.coordShift || {x: 0, y: 0};
    this.$el = opts.$el || 
      $('<div>').css({
        backgroundColor: '#999',
      })
    .addClass('player');

    this.update();
  }

  update(model) {
    if (model) _.extend(this.model, model);

    this.$el.css({
      left: this.model.coords.x + this.coordShift.x,
      top: this.model.coords.y + this.coordShift.y
    });

    this.$el.attr('id', 'field-player-' + this.model.id);
  }
}
FieldPlayer.prototype.__proto__ = EventEmitter.prototype;

module.exports = FieldPlayer;
