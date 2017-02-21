'use strict';
let connection = require('./connection.js');
let logFilesSync = require('./cloud-sync.js');
let utils = require('./utils.js');

const IS_DESKTOP = false;
utils.determineInterface(IS_DESKTOP, () => {
  utils.initFiles(() => {
    connection(() => {
      logFilesSync();
      // process.exit();
    });
  });
});
