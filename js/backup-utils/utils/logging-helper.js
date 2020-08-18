const utils = require('../utils');

const startBackupMessage = (startTimeString, finalDestinationPath) => {
  utils.writeLogging('----------------------');
  utils.writeLogging(`Starting your backup! The time is currently ${startTimeString}.`);
  utils.writeLogging(`Your files will go into ${finalDestinationPath}`);
  utils.writeLogging('----------------------');
};

const finishBackupMessage = (endTimeString, totalTime, finalDestinationPath) => {
  utils.writeLogging('----------------------');
  utils.writeLogging(`The connection has fully closed. The time is currently ${endTimeString}.`);
  utils.writeLogging('Your backup has finished:');
  utils.writeLogging(`This operation took ${totalTime} minutes`);
  utils.writeLogging(`Your backup is located in ${finalDestinationPath}`);
  utils.writeLogging('----------------------');
};

const sendDownloadErrorMessage = (err) => {
  utils.writeLogging('----------------------');
  utils.writeLogging(`[Download Error] ${err}`, true);
  utils.writeLogging('We will restart the download process.');
  utils.writeLogging('----------------------');
};

module.exports = {
  startBackupMessage,
  finishBackupMessage,
  sendDownloadErrorMessage,
};
