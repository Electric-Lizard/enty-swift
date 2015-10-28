"use strict"
let util = require('util');
let EventEmitter = require('events').EventEmitter;
let _ = require('underscore');
let FieldPlayer = require('./field-player.js');


class FieldZone {
  constructor(opts) {
    opts = opts || {};

    this.model = opts.model;
    this.id = this.model.id;
    this.$el = opts.$el;
    this.players = [];
    this.areaOffset = null;
    this.discoverOffset();
    this.model.players.forEach(pModel => {
      this.addPlayer(new FieldPlayer({
        model: pModel,
        coordShift: {x: this.areaOffset.left - 10, y: this.areaOffset.top - 10}
      }));
    });

    this.delegateEvents();
  }

  delegateEvents() {
    this.$el.on('mousemove', e => {
      let coords = {
        x: e.pageX - this.areaOffset.left,
        y: e.pageY - this.areaOffset.top
      };
      let player = this.players[0];//sick!
      player.coords = coords;
      this.emit('playerMove', {player: player});
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
FieldZone.prototype.__proto__ = EventEmitter.prototype;

module.exports = FieldZone;
