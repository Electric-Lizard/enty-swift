"use strict";
class ESLogger {
  trace(message) {
    console.log(`${new Date()}: ${message}`);
  }
}
module.exports = new ESLogger();
