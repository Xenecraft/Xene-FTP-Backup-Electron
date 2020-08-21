const { CronJob } = require('cron');
const connection = require('./ftp-connection');
const cronTimeSettings = require('../app-settings').CRON_TIME;

console.log('Cronjob has been initiated for', cronTimeSettings);

const downloadFollowUpTask = () => {
  // Queue your next task after the download finishes here!
};

const job = new CronJob(cronTimeSettings, () => {
  connection(downloadFollowUpTask);
});

job.start();
