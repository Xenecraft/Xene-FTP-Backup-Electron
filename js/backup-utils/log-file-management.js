const fs = require('fs-extra');
const path = require('path');
const zlib = require('zlib');

// My Modules
const utils = require('./utils.js');
const settings = require('../app-settings.js');
const { getCurrentTimestamp } = require('./utils/moment-helper');

const startTime = getCurrentTimestamp();
const todayString = startTime.format('YYYY[.]MM[.]DD');
const { destinationPath } = settings.COPY_PATH;
const extractLogPath = destinationPath + todayString + path.sep + settings.COPY_PATH.folderName;
const baseLogLocation = `${extractLogPath}${path.sep}logs${path.sep}`;

const gzExtract = (filePath, newPath, fileName) => {
  const fileToBeExtracted = fs.createReadStream(filePath);
  const outputPath = newPath + fileName.slice(0, fileName.length - 3);
  const output = fs.createWriteStream(outputPath);

  // Create a folder if none exists.
  utils.checkOrMakeFolder(newPath);

  return fileToBeExtracted.pipe(zlib.Unzip()).pipe(output);
};

const initLogCopy = () => {
  console.log(baseLogLocation);
  fs.readdir(baseLogLocation, (data, files) => {
    if (files === undefined) return utils.writeToLogs('No such files or path exists', true);
    files.forEach((file) => {
      const localFile = `${baseLogLocation}${file}`;
      const newLocation = `${extractLogPath}${path.sep}ExtractedLogs${path.sep}`;

      if (localFile.endsWith('.gz')) {
        utils.writeToLogs(`[Extracting] ${file} to ${newLocation}`);
        return gzExtract(localFile, newLocation, file);
      }
    });
  });
};

module.exports = initLogCopy;
