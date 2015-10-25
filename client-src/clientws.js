var socket = require('socket.io-client')({path: '/socket'});

$(function() {
  var $zone1 = $('#field-zone-1');
  var $cursor = $('<div>').css({position: 'absolute', backgroundColor: 'purple', width: '10px', height: '10px', left: 0, top: 0});
  $zone1.append($cursor);
  var zOffset = $zone1.offset();
  
  $zone1.on('mousemove', function(e) {
    var coords = {left: e.pageX - zOffset.left, top: e.pageY - zOffset.top};
    socket.emit('move', {player: 1, coords: coords});
  });

  socket.on('move', function(info) {
    $cursor.css(info.coords);
  });
});
