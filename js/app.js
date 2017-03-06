// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';
const connection = require('./backup-utils/connection.js');
const extractLogs = require('./backup-utils/cloud-sync.js');
const utils = require('./backup-utils/utils.js');
const events = require('./backup-utils/events.js');


const IS_DESKTOP = true;
utils.determineInterface(IS_DESKTOP, utils.initFiles);

document.getElementById("backup-start").addEventListener("click", startBackup);
document.getElementById("extract-logs").addEventListener("click", extractLogFiles);

// let links = document.getElementsByTagName('a');
// for(let i = 0; i < links.length; i++){
// 	let element = links[i];
// 	element.addEventListener("click", (element)=>{
// 	//Perform check on element here.
// })};

function startBackup() {
	events.listenMessage();
  connection(() => {
    process.exit();
  });
};

function extractLogFiles() {
  extractLogs();
}
