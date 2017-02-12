XeneBackup - Electron
-----
An expansion of the original [Xene-FTP-Backup](https://github.com/Xenecraft/Xene-FTP-Backup) utility that could only be run via node. Use should be able to install this Electron utility and 

Setup
-----
1. `npm install`
2. Create your own app-settings.js at the js folder for the config of the FTP, or Create it from the settings page:
	```json
	var CONNECTION_SETTINGS = {
		host: 'ftpIP',
		user: 'userAccount',
		password: 'passWord',
		port: 21
	};

	var COPY_PATH = {
		folderName: 'yourFTPFolder',
		destinationPath: 'whereYourFilesGo',
		ignoreFiles: ['.filetype', 'textinside', 'fullfile.name'],
	};

	var CRON_TIME = '00 00 3 * * 0-6';
	//this will run nightly at 3:00 AM every day

	module.exports = {CONNECTION_SETTINGS, COPY_PATH, CRON_TIME};

	```
3. `npm start`

Packages used: 

ToDos:
-----
* Periodically delete other nights based on the frequency of backups
* Include consideration for cronjob
* Actual Windows installer

Extra Notes:
----
Feel free to use this for non-Minecraft uses too! This downloads all existing files from an FTP server so you could use it to back up other applications as well! As long as there are files and directories in your FTP folder, then it will take everything out and copy it to your desired destination!
