const connection = require('./ftp-connection');
const logFilesSync = require('./log-file-management');
const utils = require('./utils');

const IS_DESKTOP = false;
utils.determineInterface(IS_DESKTOP, () => {
  utils.initFiles(() => {
    connection(() => {
      logFilesSync();
      // process.exit();
    });
  });
});
