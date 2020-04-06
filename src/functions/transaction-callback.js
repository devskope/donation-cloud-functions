const url = require('url');

const paystack = require('../services/paystack');
const { preflight, successResponse } = require('../utils');

const { CLIENT_REDIRECT_URL } = process.env;

const transactionCallback = (req, res) => {
  if (preflight(req, res, 'GET', 'https://paystack.co'))
    return successResponse(res, {}, 204);

  res.redirect(`${CLIENT_REDIRECT_URL}?${url.parse(req.url).query}`);
};

module.exports = transactionCallback;
