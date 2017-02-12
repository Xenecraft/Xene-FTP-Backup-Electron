'use strict';
const connection = require('./connection.js');
const CronJob = require('cron').CronJob;
const settings = require('../app-settings').CRON_TIME;

console.log('Cronjob has been initiated for', settings);
var job = new CronJob(settings, ()=>{
	connection(()=>{
		//You can queue the next task here!
	});
});

job.start();