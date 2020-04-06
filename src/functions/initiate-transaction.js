const paystack = require('../services/paystack');
const { preflight, errorResponse, successResponse } = require('../utils');

const initiateTransaction = async (req, res) => {
  if (preflight(req, res, 'POST')) return successResponse(res, {}, 204);

  const { data, error } = await paystack.initializeTransaction(req.body);

  if (data) return successResponse(res, data);

  errorResponse(res, error, error.statusCode);
};

module.exports = initiateTransaction;
