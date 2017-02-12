// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';
let connection = require('./backup-utils/connection.js');

document.getElementById("backup-start").addEventListener("click", startBackup);

function startBackup (){
	connection(()=>{
		process.exit();
	});
};