var socket = require('socket.io-client')({path: '/socket'});

$(function() {
  var $zone1 = $('#field-zone-1');
  var $zone2 = $('#field-zone-2');
  var $cursor1 = $('<div>').css({position: 'absolute', backgroundColor: 'pink', width: '20px', height: '20px', left: 0, top: 0});
  var $cursor2 = $('<div>').css({position: 'absolute', backgroundColor: 'yellow', width: '20px', height: '20px', left: 0, top: 0});
  $zone1.append($cursor1);
  $zone2.append($cursor2);
  var z1Offset = $zone1.offset();
  var z2Offset = $zone2.offset();
  
  $zone1.on('mousemove', function(e) {
    var coords = {left: e.pageX - z1Offset.left, top: e.pageY - z1Offset.top};
    socket.emit('move', {player: 1, coords: coords});
  });

  $zone2.on('mousemove', function(e) {
    var coords = {left: e.pageX - z2Offset.left, top: e.pageY - z2Offset.top};
    socket.emit('move', {player: 2, coords: coords});
  });

  socket.on('move', function(info) {
    var $cursor = info.player === 1 ? $cursor1 : $cursor2;
    $cursor.css(info.coords);
  });
});
