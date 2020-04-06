const { env } = process;

exports.amountToLowerDenomination = amount => amount * 100;

exports.computePaystackFees = amount => {
  const decimalFee = env.PAYSTACK_NGN_TX_FEE / 100;
  const feeCap = this.amountToLowerDenomination(env.PAYSTACK_NGN_FEE_CAP); // to disregard for international TXs
  const flatCharge =
    amount > this.amountToLowerDenomination(env.PAYSTACK_NGN_FEE_FREE_MAX)
      ? this.amountToLowerDenomination(env.PAYSTACK_NGN_ADDITIONAL_FEE)
      : 0;
  const fee = Math.ceil(decimalFee * amount + flatCharge);
  return Math.min(fee, feeCap);
};

exports.preflight = (req, res, methods = 'POST', origin = '*') => {
  if (req.method === 'OPTIONS') {
    this.setResponseHeaders(res, methods, origin);
    return true;
  }

  this.setResponseHeaders(res, methods, origin);
  return false;
};

exports.setResponseHeaders = (res, methods, origin) => {
  res.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': 'content-type',
  });
};

exports.errorResponse = (res, error, status = 500) => {
  res.status(status).json({ error });
};

exports.successResponse = (res, data, status = 200) => {
  res.status(status).json({ data });
};
