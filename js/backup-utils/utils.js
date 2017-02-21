'use strict';
//Node Modules
const fs = require('fs');
const mkdirp = require('mkdirp');
const moment = require('moment');

//Methods we export
const utils = {
  ignoreBuilder,
  initFiles,
	makeFolder,
  writeLogging,
};

const logsPath = '../../Logs';
const dateFormatted = moment().format('YYYY-MM-D');
let logFileName = dateFormatted + '-log.txt';
let fullFilePath = logsPath + '/' + logFileName;
let fileHeaderMessage = dateFormatted + ' Backup Log File\r\n';

function handleErrors(error, callback){
  if(error) return console.log('There was an error:', error);
  if (callback) callback();
}

function ignoreBuilder(array){
  let formattedSearch = array.map((term)=>{
    return '(' + term + ')';
  })
  formattedSearch = formattedSearch.join('|');
  return formattedSearch;
};

function initFiles(cb){
  //Check to see if the file does not exist, if not then create it
  makeFolder(logsPath, ()=>{
    let fileNotExists = !fs.existsSync(fullFilePath);
    if(fileNotExists){
      fs.writeFile(fullFilePath, fileHeaderMessage, handleErrors(err, cb));
    }else
      if (cb) cb();
  });
}

function makeFolder(folderPath, cb) {
  //Create a folder if none exists.
  fs.access(folderPath, fs.F_OK, (err) => {
    if (err) {
      mkdirp(folderPath, handleErrors(err2, cb));
    }else
      if(cb) cb();
  });
}

function writeLogging(message, error){
  if(error) console.error(message);
  else console.log(message);

  //Add a new line for each write in the log file itself
  let timeFormatted = moment().format('HH:mm:ss');
  message = `[${timeFormatted}] ${message} \r\n`;
  fs.appendFile(fullFilePath, message, handleErrors(err);
}

module.exports = utils;