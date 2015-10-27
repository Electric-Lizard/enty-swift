"use strict"
let socket = require('socket.io-client')({path: '/socket'});
let Field = require('./view/field.js');
let FieldSideModel = require('../model/field-side-model.js');
let FieldPlayerModel = require('../model/field-player-model.js');

$(function() {
  let $zone1 = $('#field-zone-1');
  let $zone2 = $('#field-zone-2');

  //TODO: remove that fake data
  let tmpSideModels = [
    new FieldSideModel({id: 0, players: [new FieldPlayerModel({id: 0})]}),
    new FieldSideModel({id: 1, players: [new FieldPlayerModel({id: 1})]}),
  ];

  let field = new Field({
    fieldSideModels: tmpSideModels,
    fieldSideElements: [$zone1, $zone2]
  });

  field.on('playerMove', e => 
      socket.emit('playerMove', e)
      )

  socket.on('playerMove', function(info) {
    field.movePlayer(info.fieldSide);
  });
});
