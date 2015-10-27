"use strict"
var util = require('util');
var EventEmitter = require('events').EventEmitter;
let _ = require('underscore');


class FieldPlayer {
  constructor(opts) {
    opts = opts || {};

    this.model = opts.model;
    this.id = this.model.id;
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
      left: model.coords.x,
      top: model.coords.y
    });

    this.attr('id', 'field-player-' + model.id);
  }
}
util.inherits(FieldPlayer, EventEmitter);

module.exports = FieldPlayer;
