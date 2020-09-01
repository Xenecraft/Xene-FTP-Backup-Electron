// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ftpConnection = require('./backup-utils/ftp-connection');
const sftpConnection = require('./backup-utils/sftp-connection');
const extractLogs = require('./backup-utils/log-file-management');
const utils = require('./backup-utils/utils');
const events = require('./backup-utils/events');

const IS_DESKTOP = true;
utils.determineInterface(IS_DESKTOP, utils.initFiles);

// let links = document.getElementsByTagName('a');
// for(let i = 0; i < links.length; i++){
//  let element = links[i];
//  element.addEventListener("click", (element)=>{
//  //Perform check on element here.
// })};

function startFTPBackup() {
  events.listenMessage();
  ftpConnection(() => {
    process.exit();
  });
}

function startSFTPBackup() {
  events.listenMessage();
  events.emitMessage('we doing sftp nigga');
  sftpConnection(() => {
    process.exit();
  });
}

function extractLogFiles() {
  extractLogs();
}

document.getElementById('ftp-backup-start').addEventListener('click', startFTPBackup);
document.getElementById('sftp-backup-start').addEventListener('click', startSFTPBackup);
document.getElementById('extract-logs').addEventListener('click', extractLogFiles);
