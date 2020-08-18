const utils = require('../utils');

const startBackupMessage = (startTimeString, finalDestinationPath) => {
  utils.writeToLogs('----------------------');
  utils.writeToLogs(`Starting your backup! The time is currently ${startTimeString}.`);
  utils.writeToLogs(`Your files will go into ${finalDestinationPath}`);
  utils.writeToLogs('----------------------');
};

const finishBackupMessage = (endTimeString, totalTime, finalDestinationPath) => {
  utils.writeToLogs('----------------------');
  utils.writeToLogs(`The connection has fully closed. The time is currently ${endTimeString}.`);
  utils.writeToLogs('Your backup has finished:');
  utils.writeToLogs(`This operation took ${totalTime} minutes`);
  utils.writeToLogs(`Your backup is located in ${finalDestinationPath}`);
  utils.writeToLogs('----------------------');
};

const sendDownloadErrorMessage = (err) => {
  utils.writeToLogs('----------------------');
  utils.writeToLogs(`[Download Error] ${err}`, true);
  utils.writeToLogs('We will restart the download process.');
  utils.writeToLogs('----------------------');
};

module.exports = {
  startBackupMessage,
  finishBackupMessage,
  sendDownloadErrorMessage,
};
