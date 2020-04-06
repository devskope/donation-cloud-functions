const bent = require('bent');

const { amountToLowerDenomination, computePaystackFees } = require('../utils');

const Authorization = `Bearer ${process.env.PAYSTACK_TEST_SECRET}`;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const payStackPost = bent(PAYSTACK_BASE_URL, 'json', 'POST', {
  Authorization
});

exports.initializeTransaction = async payload => {
  const response = { data: null, error: null };

  payload.amount = amountToLowerDenomination(payload.amount);
  payload.amount += computePaystackFees(payload.amount);

  try {
    response.data = await payStackPost('/transaction/initialize', payload);
  } catch (error) {
    response.error = await handlePaystackApiError(error);
  }

  return response;
};

const handlePaystackApiError = async error => {
  if (error.message.includes('Incorrect statusCode:')) {
    return {
      message: 'An error occured. Please verify your credentials/inputs',
      responseBody: JSON.parse((await error.responseBody).toString()),
      statusCode: error.statusCode
    };
  }

  return {
    message: 'An error occured. Please try again',
    statusCode: 400
  };
};
