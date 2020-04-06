require('dotenv').config();

const functions = require('./functions');

module.exports = {
  initTx: functions.initiateTransaction,
  txCallback: functions.transactionCallback,
  verifyTx: functions.verifyTransaction
};
