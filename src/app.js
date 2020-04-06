require('dotenv').config();

const functions = require('./functions');

module.exports = {
  initTx: functions.initiateTransaction,
};
