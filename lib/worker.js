const cron = require('node-cron');
const debug = require('debug')('cron');
const moment = require('moment');

const { axios } = require('./helpers');

const CRON_SCHEDULE = '0 0 */2 * * *';

cron.schedule(CRON_SCHEDULE, async () => {
  try {
    const response = await axios({ method: 'GET', url: 'v1/widgets' });
    const widgets = response && response.data;
    console.log(`[${moment().format()}] # of widgets: ${widgets.length}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = cron;
