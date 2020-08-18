const connection = require('./connection.js');
const logFilesSync = require('./cloud-sync.js');
const utils = require('./utils.js');

const IS_DESKTOP = false;
utils.determineInterface(IS_DESKTOP, () => {
  utils.initFiles(() => {
    connection(() => {
      logFilesSync();
      // process.exit();
    });
  });
});
