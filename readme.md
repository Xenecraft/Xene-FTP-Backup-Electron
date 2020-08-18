XeneBackup - Electron
-----
An expansion of the original [Xene-FTP-Backup](https://github.com/Xenecraft/Xene-FTP-Backup) utility that could only be run via node. Use should be able to install this Electron utility and successfully download file from a remote server using FTP or SFTP.

Setup
-----
1. `npm install`
2. Create your own `app-settings.js` file at the inside of the js folder, or Create it from the settings page:
  ```json
  const CONNECTION_SETTINGS = {
    ftpHost: 'ftpIP',
    ftpUser: 'userAccount',
    ftpPassword: 'passWord',
    sftpHost: 'sftpIP',
    sftpUser: 'userAccount',
    sftpPassword: 'passWord',
    ftpPort: 21,
    sftpPort: 7767,
    keepalive: 30000,
  };

  const COPY_PATH = {
    folderName: 'yourFTPFolder',
    destinationPath: 'whereYourFilesGo',
    ignoreFiles: ['.png', 'dynmap', 'desktop.ini'],
  };

  var CRON_TIME = '00 00 3 * * 0-6';
  //this will run nightly at 3:00 AM every day

  const APP_SETTINGS = {
    isDesktop: true,
  };

  module.exports = {
    CONNECTION_SETTINGS,
    COPY_PATH,
    CRON_TIME,
    APP_SETTINGS,
  };

  ```
3. `npm start`


Code ToDos:
-----
* Better clearer naming for everything
* Manage the specific file settings (Write/Encode/Save a file)
* Separate log extractor into a new file/utility
* Create tests for functionality
* Reasses Electron Page Stylings
* Fix bug with log extract and end of files

User Facing ToDos:
----
* Display Log folder and allow user to view the files in there
* Edit the app-settings.js from the settings.html page
  * Create the app-settings.js file if one does not exist (do check)
* Include consideration for cronjob
* Periodically delete other nights based on the frequency of backups
* Actual OS Agnostic installer

Extra Notes:
----
Feel free to use this for non-Minecraft uses too! This downloads all existing files from an FTP server so you could use it to back up other applications as well! As long as there are files and directories in your FTP folder, then it will take everything out and copy it to your desired destination!
