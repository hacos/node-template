require('dotenv').config();

const shutdown = async (err) => {
  if (err) { console.error(err); }
  process.exit(err ? 1 : 0);
}

process.on('SIGINT', async (err) => await shutdown(err));
process.on('SIGTERM', async (err) => await shutdown(err));
process.on('uncaughtException', async (err) => await shutdown(err));

const app = require('./lib/app');
