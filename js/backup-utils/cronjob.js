const connection = require('./connection.js');
const CronJob = require('cron').CronJob;
const cronTimeSettings = require('../app-settings').CRON_TIME;

console.log('Cronjob has been initiated for', cronTimeSettings);
const job = new CronJob(cronTimeSettings, () => {
  connection(downloadFollowUpTask);
});

job.start();

const downloadFollowUpTask = () => {
  // Queue your next task after the download finishes here!
};
