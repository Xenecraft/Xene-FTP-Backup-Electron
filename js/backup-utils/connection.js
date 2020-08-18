const Client = require('ftp');
const fs = require('fs');

const settings = require('../app-settings.js');
const utils = require('./utils.js');
const { getCurrentTimestamp } = require('./utils/moment-helper');
const { startBackupMessage, finishBackupMessage, sendDownloadErrorMessage } = require('./utils/logging-helper');
const { setFTPSettings } = require('./utils/environment-helper');

const ignoreString = utils.ignoreBuilder(settings.COPY_PATH.ignoreFiles);

function startFTPDownload(callback) {
  // Instantiate all temporary variables for this routine
  const startTime = getCurrentTimestamp();
  const startTimeString = startTime.format('HH[:]mm[:]ss');
  const todayString = startTime.format('YYYY[.]MM[.]DD');
  const destinationPath = settings.COPY_PATH.destinationPath;
  const finalDestinationPath = destinationPath + todayString;

  startBackupMessage(startTimeString, finalDestinationPath);

  utils.makeFolder(finalDestinationPath);
  downloadFTPFiles(finalDestinationPath, startTime, callback);
}

function downloadFTPFiles(finalDestinationPath, startTime, callback) {
  // Main function where files are downloaded from. Will be called again if connection breaks.
  const transferClient = new Client();
  const copyPath = settings.COPY_PATH.folderName;

  transferClient.on('ready', () => {
    transferClient.list(copyPath, (err, list) => {
      if (err) downloadRestart(err, finalDestinationPath, startTime);
      list.forEach((item) => {
        if (item.type === '-') downloadFile(transferClient, copyPath, item.name, finalDestinationPath);
        else recursiveLookDown(transferClient, `${copyPath}/${item.name}`, finalDestinationPath, startTime);
      });
      transferClient.end();
    });
  });

  transferClient.on('end', () => {
    finishFTPDownload(startTime, finalDestinationPath, callback);
  });

  // Connect using our Credentials
  const ftpSettings = setFTPSettings(settings.CONNECTION_SETTINGS);
  transferClient.connect(ftpSettings);
}

function finishFTPDownload(startTime, finalDestinationPath, callback) {
  const endTime = getCurrentTimestamp();
  const totalTime = endTime.diff(startTime, 'minutes');
  const endTimeString = endTime.format('HH[:]mm[:]ss');

  finishBackupMessage(endTimeString, totalTime, finalDestinationPath);

  if (callback) callback();
}

function downloadFile(transferClient, filePath, fileName, finalDestinationPath, startTime) {
  const finalFile = `${filePath}/${fileName}`;
  utils.makeFolder(finalDestinationPath + '\\' + filePath);

  // Ignore downloading a file if it matches the fileType
  const fileEndIgnore = new RegExp(ignoreString, 'g');
  if (!finalFile.match(fileEndIgnore)) {
    transferClient.get(finalFile, (err, stream) => {
      utils.writeLogging(`[Downloading] ${finalFile}`);
      if (err) downloadRestart(err, finalDestinationPath, startTime);
      else {
        stream.once('close', () => { /* Each file closes its own connection */ });
        stream.pipe(fs.createWriteStream(finalDestinationPath + '\\' + finalFile));
      }
    });
  } else utils.writeLogging(`[Ignoring] ${fileName} due to settings`);
}

function recursiveLookDown(transferClient, topDirectory, finalDestinationPath, startTime) {
  transferClient.list(topDirectory, (err, list) => {
    if (err) {
      utils.writeLogging(`[Recrusive Error] ${err}`, true);
      downloadRestart(err, finalDestinationPath, startTime);
    } else {
      list.forEach((item) => {
        if (item.type === '-') downloadFile(transferClient, topDirectory, item.name, finalDestinationPath, startTime);
        else recursiveLookDown(transferClient, topDirectory + '/' + item.name, finalDestinationPath, startTime);
      });
    }
  });
}

function downloadRestart(err, finalDestinationPath, startTime) {
  sendDownloadErrorMessage(err);
  downloadFTPFiles(finalDestinationPath, startTime);
}

// Uncomment to test the FTP Download without the cronjob.
// downloadFTPFiles();

module.exports = startFTPDownload;
