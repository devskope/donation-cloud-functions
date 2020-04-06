const paystack = require('../services/paystack');

const { preflight, errorResponse, successResponse } = require('../utils');

const verifyTransaction = async (req, res) => {
  if (preflight(req, res, 'POST')) return successResponse(res, {}, 204);

  const { data, error } = await paystack.verifyTransaction(req.body.reference);

  if (data) return successResponse(res, data);

  errorResponse(res, error, error.statusCode);
};

module.exports = verifyTransaction;
