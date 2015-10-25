"use strict";
var Socket = require('socket.io');
var http = require('http');
let logger = require('../Logger.js');

class ESWSServer {
  constructor() {
    this.socket = null;
  }

  /**
   * Runs websocket server
   */
  run(server) {
    this.io = new Socket(server, {path: "/socket"});
    this.delegateEvents();
  }

  delegateEvents() {
    var eswss = this;
    //On request ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    eswss.io.on('connection', function(socket) {
      logger.trace(`User connected - ${socket.id}`);

      socket.on('move', function(info) {
        logger.trace(info);
        eswss.io.emit('move', info);
      });
    });
  }
}

module.exports = new ESWSServer();
