"use strict"
let util = require('util');
let EventEmitter = require('events').EventEmitter;
let _ = require('underscore');
let FieldPlayer = require('./field-player.js');


class FieldSide {
  constructor(opts) {
    EventEmitter.call(this);
    opts = opts || {};

    this.model = opts.model;
    this.id = this.model.id;
    this.$el = opts.$el;
    this.players = [];
    this.model.players.forEach(pModel => this.addPlayer(new FieldPlayer({model: pModel})));
    this.areaOffset = null;

    this.discoverOffset();
    this.delegateEvents();
  }

  delegateEvents() {
    this.$el.on('mousemove', e => {
      let coords = {
        x: e.pageX - this.areaOffset.left,
        y: e.pageY - this.areaOffset.top
      };
      this.emit('playerMove', {player: this.players[0]});//sick!
    });
  }

  movePlayer(playerModel) {
    let player = this.player(playerModel.id);
    //TODO: check for existance
    player.update(playerModel);
  }

  addPlayer(player) {
    this.players.push(player);
    
    player.$el.appendTo('body');
  }

  discoverOffset() {
    this.areaOffset = this.$el.offset();
  }

  player(id) {
    return _.findWhere(this.players, {id: id});
  }
}
util.inherits(FieldSide, EventEmitter);
_.extend(FieldSide.prototype.__proto__, EventEmitter.prototype);

module.exports = FieldSide;
