const fs = require('fs');
const mkdirp = require('mkdirp');
const events = require('./events');
const { getCurrentTimestamp } = require('./utils/moment-helper');

// Methods To Export
let logsPath = '';
let fullFilePath = '';
let actuallyDesktop = false;
const dateFormatted = getCurrentTimestamp().format('YYYY-MM-D');

const determineInterface = (isDesktop, initializerCallback) => {
  // Affects initFiles, writeToLogs
  let settingsFileString = '';
  const logFileName = dateFormatted + '-log.txt';

  actuallyDesktop = isDesktop;

  if (isDesktop) {
    logsPath = 'Logs';
    settingsFileString = './js/app-settings.js';
  } else {
    logsPath = '../../Logs';
    settingsFileString = '../app-settings.js';
  }
  fullFilePath = logsPath + '/' + logFileName;
  let settingsFile = fs.readFileSync(settingsFileString, 'utf-8');

  const settingLine = 'isDesktop: ';
  const searchRegexString = settingLine + '(false|true)' + ',';
  const currentSettingString = settingLine + isDesktop + ',';

  const searchRegex = new RegExp(searchRegexString);
  const updatedDesktopSetting = settingsFile.replace(searchRegex, currentSettingString);

  fs.writeFileSync(settingsFileString, updatedDesktopSetting, 'utf-8');
  if (isDesktop) writeToLogs('Desktop environment determined. Changing isDesktop setting to true.');
  else writeToLogs('Console environment determined. Changing isDesktop setting to false.');

  initializerCallback();
};

const handleErrors = (error, callback) => {
  if (error) return writeToLogs('There was an error: ' + error, true);
  if (callback) callback();
};

const ignoreBuilder = (array) => {
  let formattedSearch = array.map((term) => {
    return '(' + term + ')';
  });
  formattedSearch = formattedSearch.join('|');
  return formattedSearch;
};

const initFiles = (cb) => {
  // Check to see if the file does not exist, if not then create it
  makeFolder(logsPath, () => {
    let fileNotExists = !fs.existsSync(fullFilePath);
    if (fileNotExists) {
      const fileHeaderMessage = dateFormatted + ' Backup Log File\r\n';
      fs.writeFile(fullFilePath, fileHeaderMessage, (err) => { handleErrors(err, cb); });
      writeToLogs('Base files does not exist, creating default file' + fullFilePath);
    } else {
      writeToLogs('Base file exists, continuing on...');
      if (cb) cb();
    }
  });
};

const makeFolder = (folderPath, callback) => {
  // Create a folder if none exists.
  fs.access(folderPath, fs.F_OK, (err) => {
    if (err) mkdirp(folderPath, (err2) => { handleErrors(err2, callback); });
    else if (callback) callback();
  });
};

const writeToLogs = (message, isError) => {
  // Praise file logging, so useful for debugging too!
  if (isError) return console.error(message);

  if (actuallyDesktop) events.emitMessage(message);
  else console.log(message);

  // Add a new line for each write in the log file itself
  const timeFormatted = getCurrentTimestamp().format('HH:mm:ss');
  message = `[${timeFormatted}] ${message} \r\n`;
  return fs.appendFile(fullFilePath, message, handleErrors);
};

module.exports = {
  determineInterface,
  ignoreBuilder,
  initFiles,
  makeFolder,
  writeToLogs,
};
