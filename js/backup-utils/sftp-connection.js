const Client = require('ssh2-sftp-client');
const fs = require('fs');

const settings = require('../app-settings.js');
const utils = require('./utils.js');
const { getCurrentTimestamp } = require('./utils/moment-helper');
const { startBackupMessage, finishBackupMessage, sendDownloadErrorMessage } = require('./utils/logging-helper');
const { setSFTPSettings } = require('./utils/environment-helper');

// const ignoreString = utils.ignoreBuilder(settings.COPY_PATH.ignoreFiles);

const sftpSettings = setSFTPSettings(settings.CONNECTION_SETTINGS);

const startSFTPDownload = () => {
  const sftp = new Client();
  sftp.connect(sftpSettings).then(() => {
    return sftp.list('/');
  }).then((data) => {
    // utils.writeToLogs(data + 'the data info');
    data.forEach((fileOrFolder) => {
      utils.writeToLogs(JSON.stringify(fileOrFolder));
    });
  }).catch((err) => {
    // utils.writeToLogs(err + 'catch error');
    console.log(err);
  });
};

module.exports = startSFTPDownload;
