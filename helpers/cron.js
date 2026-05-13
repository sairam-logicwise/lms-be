const cron = require('node-cron');
const https = require('https');

const setupHealthCheckCron = () => {
  // Cron job to run every 14 minutes
  cron.schedule('*/14 * * * *', () => {
    console.log('Running health check cron job...');
    
    https.get('https://lms-be-q5hd.onrender.com/', (res) => {
      console.log(`Health check ping status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Error in health check ping: ${err.message}`);
    });
  });
};

module.exports = { setupHealthCheckCron };
