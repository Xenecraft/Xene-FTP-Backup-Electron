// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';
const connection = require('./backup-utils/connection.js');
const extractLogs = require('./backup-utils/cloud-sync.js');
const utils = require('./backup-utils/utils.js');

const IS_DESKTOP = true;
utils.determineInterface(IS_DESKTOP, utils.initFiles);

document.getElementById("backup-start").addEventListener("click", startBackup);
document.getElementById("extract-logs").addEventListener("click", extractLogFiles);

function startBackup (){
	connection(()=>{
		process.exit();
	});
};

function extractLogFiles(){
	extractLogs();
}